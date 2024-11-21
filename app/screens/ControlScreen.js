import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

function ControlScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <View style={styles.cardBody}>
                        <View style={styles.deviceOverview}>
                            <Image
                                source={require('../../assets/aquarium.png')} 
                                style={styles.aquariumIcon}
                            />
                            <Text style={styles.recentText}>{context.device.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.recentSubText}>Temperature: {mqtt.data.temp}C</Text>
                            <Text style={styles.recentSubText}>pH Level: {mqtt.data.pH}</Text>
                            <Text style={styles.recentSubText}>Feeds Remaining: {mqtt.data.feed}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Remote Feed</Text>
                    <Text style={styles.cardSubTitle}>Press and hold the button to activate feeding.</Text>
                    <Text style={styles.cardSubTitle}>Release the button to deactivate.</Text>
                    <View style={styles.cardBody}>
                        <Pressable style={styles.buttonMargin} onLongPress={() => {
                            mqtt.publish(`/${context.device.id}/remote`, "ON")
                        }}
                        onPressOut={() => {
                            mqtt.publish(`/${context.device.id}/remote`, "OFF")
                        }}
                        >
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Hold</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 36
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 40
    },
    body: {
        marginVertical: 60
    },
    card: {
        marginBottom: 32
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: "bold"
    },
    cardSubTitle: {
        fontSize: 16,
        color: "grey"
    },
    cardBody: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    recentText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    recentSubText: {
        fontSize: 16,
        color: "grey"
    },
    buttonMargin: {
        marginVertical: 2
    },
    button: {
      height: 50,
      width: "auto",
      backgroundColor: "#0E79B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    deviceOverview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    aquariumIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});

export default ControlScreen;