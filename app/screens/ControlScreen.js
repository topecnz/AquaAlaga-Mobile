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
                            {(!mqtt.data.temp && !mqtt.data.pH)? (
                                <Text style={styles.recentText}>Offline</Text>
                            ) : (
                                <View>
                                    <View style={styles.recentData}>
                                        <Text style={styles.recentSubText}>Temperature: {mqtt.data.temp}C</Text>
                                        { (context.device.temperature + 3 >= mqtt.data.temp
                                            && context.device.temperature - 3 <= mqtt.data.temp)? (
                                                <View>
                                                    <Text style={styles.normalStatus}>NORMAL</Text>
                                                </View>
                                            ) : (
                                                (context.device.temperature + 3 < mqtt.data.temp)? (
                                                    <View>
                                                        <Text style={styles.highStatus}>HIGH</Text>
                                                    </View>
                                                ):(
                                                    <View>
                                                        <Text style={styles.lowStatus}>LOW</Text>
                                                    </View>
                                                )
                                            )

                                        }
                                    </View>
                                    <View style={styles.recentData}>
                                        <Text style={styles.recentSubText}>pH Level: {mqtt.data.pH}</Text>
                                        { (context.device.ph_level + 3 >= mqtt.data.pH
                                            && context.device.ph_level - 3 <= mqtt.data.pH)? (
                                                <View>
                                                    <Text style={styles.normalStatus}>NORMAL</Text>
                                                </View>
                                            ) : (
                                                (context.device.ph_level + 3 < mqtt.data.pH)? (
                                                    <View>
                                                        <Text style={styles.highStatus}>HIGH</Text>
                                                    </View>
                                                ):(
                                                    <View>
                                                        <Text style={styles.lowStatus}>LOW</Text>
                                                    </View>
                                                )
                                            )

                                        }
                                    </View>
                                </View>
                            )

                            }
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
                            console.log("test")
                        }}
                        onPressOut={() => {
                            mqtt.publish(`/${context.device.id}/remote`, "OFF")
                        }}
                        disabled={(!mqtt.data.temp && !mqtt.data.pH) ? true : false}>
                            <View style={(!mqtt.data.temp && !mqtt.data.pH) ? styles.buttonDisabled : styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>{(!mqtt.data.temp && !mqtt.data.pH) ? "Offline" : "Hold"}</Text>
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
    buttonDisabled: {
      height: 50,
      width: "auto",
      backgroundColor: "#666",
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
    recentData: {
        flexDirection: "row",
        marginVertical: 1
    },
    normalStatus: {
        fontWeight: "600",
        color: "white",
        marginHorizontal: 5,
        paddingHorizontal: 8,
        backgroundColor: "green",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    highStatus: {
        fontWeight: "600",
        color: "white",
        marginHorizontal: 5,
        paddingHorizontal: 8,
        backgroundColor: "red",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    lowStatus: {
        fontWeight: "600",
        color: "black",
        marginHorizontal: 5,
        paddingHorizontal: 8,
        backgroundColor: "yellow",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
});

export default ControlScreen;