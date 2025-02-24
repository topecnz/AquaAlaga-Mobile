import React, { Component, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MqttClient, MqttEvent, MqttOptionsBuilder } from 'react-native-mqtt-clients';
import { Buffer } from 'buffer';
import * as Notifications from "expo-notifications";
// import { EXPO_PUBLIC_MQTT_URL, EXPO_PUBLIC_MQTT_USERNAME, EXPO_PUBLIC_MQTT_PASSWORD } from "@env";
import Constants from 'expo-constants';

export const MqttContext = createContext();

const config = new MqttOptionsBuilder()
  .uri('tcp://'+ Constants.expoConfig.extra.env.MQTT_URL +':1883')
  .clientId("aquaalaga_" + Math.random().toString(16).substring(2, 8))
  .username(Constants.expoConfig.extra.env.MQTT_USERNAME)
  .password(Constants.expoConfig.extra.env.MQTT_PASSWORD)
  .autoReconnect(true)
  .build();

const client = new MqttClient(config);

// create a component
class MqttProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: client,
            data: {
                pH: 0,
                temp: 0,
                feed: 0,
            },
            isDeleted: false,
            isDeviceSelected: false
        }
    }
    notif = async (message) => {
        try {
          console.log('notifying:', message.id);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: message.topic,
              body: `${message.device_name}: ${message.message}`,
              
            },
            trigger: null, 
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };

    onConnect = async () => {
        await client.init()

        client.on(MqttEvent.MESSAGE_RECEIVED,
            (topic, payload) => {
                // called when client has received a message
                var msg = Buffer.from(payload.buffer);
                let data = JSON.parse(msg);
                if (topic.includes("/sensor")) {
                    console.log("RECEIVED " + msg.toString())
                    this.updateState(this, {data: data})
                }

                if (topic.includes("/delete") && data.message == "OK") {
                    console.log("DELETED " + data.id);
                }

                if (topic.includes("/notification")) {
                    this.notif(data);
                }
            }
        );
        client.on(MqttEvent.MESSAGE_PUBLISHED,
            (topic, payload) => {
                // called when client has sent a message
                var msg = Buffer.from(payload.buffer);
                console.log(`[${topic}] PUBLISHED ${msg}`);
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
        client.on(MqttEvent.CONNECTED, async () => {
            // called when client is connected
            console.log('Connected!')
            // try {
            //     await client.subscribeAsync({
            //         topic: "/notification",
            //         qos: 0
            //     }).then(() => {
            //         // this.notif({message: "Message"});
            //     });
            // } catch (e) {
            //     console.log(e)
            // }
            this.subscribe("/notification");
        });
        client.on(MqttEvent.SUBSCRIBED, (topic) => {
        // called when client has subscribed to a topic
            console.log(topic[0].includes("/sensor"));
            if (topic[0].includes("/sensor")) {
                console.log("true");
                this.updateState(this, {isDeviceSelected: true})
            }
            console.log('Subscribed ' + topic);
        });
        client.on(MqttEvent.UNSUBSCRIBED, (topic) => {
        // called when client has unsubscribed from a topic
            console.log(topic[0].includes("/sensor"));
            if (topic[0].includes("/sensor")) {
                this.updateState(this, {isDeviceSelected: false})
            }
            console.log('Unsubscribed ' + topic);
        });
        client.on(MqttEvent.DISCONNECTED, (topic) => {
        // called when client is disconnected
            console.log('Disconnected!');
        });
        
        try {
            await client.connectAsync();
        } catch (e) {
        // handle error
            console.log('MQTT broker error.')
        }
    }

    subscribe = async (topic, item = {}) => {
        try {
            await client.subscribeAsync(
            {
                topic: topic,
                qos: 0
            }).then(() => {
                if (item.item) {
                    console.log(item);
                    item.onSelect(true, item.item);
                }
            });
        } catch (e) {
            console.log(e)
            if (item.item) {
                item.onSelect(false, item.item);
            }
        }
    }

    unsubscribe = async (topic) => {
        try {
            await client.unsubscribeAsync(topic)
            this.updateState(this, {data: {
                pH: 0,
                temp: 0,
                feed: 0,
            }})
        } catch (e) {
            console.log(e)
        }
    }

    publish = async (topic, msg) => {
        let r = Buffer.from(msg).toJSON().data;
        try {
            client.publish(
                topic,
                r,
            );
        } catch (e) {
            console.log("Error" + e);
        }
    }

    onDisconnect = async () => {
        try {
            await client.disconnectAsync();
        }
        catch (e) {
            console.log(e);
        }
    }
    
    notifRequest = async () => {
        await Notifications.requestPermissionsAsync();
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });
        
      };

    componentDidMount() {
        this.onConnect();
        this.notifRequest();
        
        
    }

    componentWillUnmount() {
        this.onDisconnect();
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
                isDeviceSelected: this.state.isDeviceSelected,
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
