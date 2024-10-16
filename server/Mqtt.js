//import liraries
import React, { Component, createContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MqttClient, MqttEvent, MqttOptionsBuilder } from 'react-native-mqtt-clients';
import { Buffer } from 'buffer';

export const MqttContext = createContext();

const config = new MqttOptionsBuilder()
  .uri('tcp://'+ process.env.EXPO_PUBLIC_MQTT_URL +':1883')
  .clientId("aquaalaga_" + Math.random().toString(16).substring(2, 8))
  .username(process.env.EXPO_PUBLIC_MQTT_USERNAME)
  .password(process.env.EXPO_PUBLIC_MQTT_PASSWORD)
  .autoReconnect(true)
  .build();

const client = new MqttClient(config);

// create a component
class MqttProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: client,
            data: {},
            isDeleted: false
        }
    }

    onConnect = async () => {
        await client.init()

        client.on(MqttEvent.MESSAGE_RECEIVED,
            (topic, payload) => {
                // called when client has received a message
                var msg = Buffer.from(payload.buffer);
                if (topic.includes("/sensor")) {
                    console.log("RECEIVED " + msg.toString())
                    this.updateState(this, {data: JSON.parse(msg)})
                }

                if (topic.includes("/delete") && msg.includes("OK")) {
                    this.updateState(this, {data: JSON.parse(msg)})
                }
            }
        );
        client.on(MqttEvent.MESSAGE_PUBLISHED,
            (topic, payload) => {
                // called when client has sent a message
                var msg = Buffer.from(payload.buffer);
                console.log("PUBLISHED " + msg);
            }
        );
        client.on(MqttEvent.CONNECTION_LOST, (error) => {
            // called when client has unexpectedly lost its connection to the broker
            console.log('MQTT: Connection lost')
        });
        client.on(MqttEvent.EXCEPTION, (error) => {
        // called when client encountered an error
            console.log("Error "+ error)
        });

        client.on(MqttEvent.CONNECTING, () => {
            // called when client is connecting
            console.log('Connecting...')
        });
        client.on(MqttEvent.CONNECTED, () => {
            // called when client is connected
            console.log('Connected!')
        });
        client.on(MqttEvent.SUBSCRIBED, (topic) => {
        // called when client has subscribed to a topic
            console.log('Subscribed ' + topic);
        });
        client.on(MqttEvent.UNSUBSCRIBED, (topic) => {
        // called when client has unsubscribed from a topic
            console.log('Unsubscribed ' + topic);
        });
        
        try {
            await client.connectAsync();
        } catch (e) {
        // handle error
            console.log('MQTT broker error.')
        }
    }

    subscribe = async (topic) => {
        try {
            await client.subscribeAsync(
            {
                topic: topic,
                qos: 0
            })
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    unsubscribe = async (topic) => {
        try {
            await client.unsubscribeAsync(topic)
        } catch (e) {
            console.log(e)
        }
    }

    publish = async (topic, msg) => {
        try {
            client.publish(
                topic,
                Buffer.from(msg),
                0,
                false
            );
        } catch (e) {
            console.log("Error" + e);
        }
    }

    componentDidMount() {
        this.onConnect();
    }

    componentWillUnmount() {
        // client.disconnectAsync()
    }

    updateState = async (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState });
    };

    render() {
        return (
            <MqttContext.Provider value={{
                client: this.state.client,
                subscribe: this.subscribe,
                unsubscribe: this.unsubscribe,
                publish: this.publish,
                data: this.state.data,
                isDeleted: this.state.isDeleted,
            }}>
                {this.props.children}
            </MqttContext.Provider>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MqttProvider;
