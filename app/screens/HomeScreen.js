import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainGradient from '../components/MainGradient';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

function HomeScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);

    useEffect(() => {
        return () => {
            mqtt.unsubscribe(`/${context.device.id}/sensor`);
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                {/* <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recent Event</Text>
                    <View style={styles.cardBody}>
                        <View>
                            <Text style={styles.recentText}>Successful Feeding</Text>
                        </View>
                        <View>
                            <Text style={styles.recentSubText}>08:00 AM - My First Fish Tank</Text>
                        </View>
                    </View>
                </View> */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Overview</Text>
                    <View style={styles.cardBody}>
                        <View style={styles.deviceOverview}>
                            <Image
                                source={require('../../assets/aquarium.png')} 
                                style={styles.aquariumIcon}
                            />
                            <Text style={styles.recentText}>{context.device.name}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Device Type</Text>
                            <Text style={styles.recentText2}>{context.device.type}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Fish Breed</Text>
                            <Text style={styles.recentText2}>{context.device.fish_breed}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Temperature</Text>
                            <Text style={styles.recentText2}>{context.device.temperature}C</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>pH Level</Text>
                            <Text style={styles.recentText2}>{context.device.ph_level}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Current Status: {(!mqtt.data.temp && !mqtt.data.pH)? "Offline" : "Online"}</Text>
                            {(!mqtt.data.temp && !mqtt.data.pH)? (null) : (
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
                                        <Text style={styles.normalStatus}>NORMAL</Text>
                                    </View>
                                </View>
                            )

                            }
                        </View>
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
        paddingHorizontal: 36,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 40,
    },
    body: {
        marginVertical: 60,
    },
    card: {
        marginBottom: 32,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    cardBody: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
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
    recentText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    recentText2: {
        fontSize: 16,
        // fontWeight: "bold"
    },
    recentSubText: {
        fontSize: 16,
        color: 'grey',
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
    gap: {
      marginVertical: 2  
    },
});

export default HomeScreen;
