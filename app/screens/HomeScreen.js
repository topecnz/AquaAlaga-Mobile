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
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recent Events</Text>
                    <View style={styles.cardBody}>
                        <View>
                            <Text style={styles.recentText}>Successful Feeding</Text>
                        </View>
                        <View>
                            <Text style={styles.recentSubText}>08:00 AM - My First Fish Tank</Text>
                        </View>
                    </View>
                </View>
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
                        <View>
                            <Text style={styles.recentSubText}>Temperature: {mqtt.data.temp}C</Text>
                            <Text style={styles.recentSubText}>pH Level: {mqtt.data.pH}</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
    },
    recentSubText: {
        fontSize: 16,
        color: 'grey',
    },
});

export default HomeScreen;
