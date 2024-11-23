import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView, PermissionsAndroid, ActivityIndicator } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

export default function DeviceScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);

    const [isSelected, setIsSelected] = useState({});

    useEffect(() => {
        context.getDevices();
    }, []);

    const onSelect = (res, item) => {
        if (res) {
            context.setDevice(item);
            props.navigation.navigate('BottomTab');
            return 0
        }

        Alert.alert('MQTT broker connection failed.')
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.card}>
                <Pressable onPress={async () => await requestFineLocation(props)}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Add Device</Text>
                    </View>
                </Pressable>
                <Pressable onPress={async () => context.getDevices()}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Refresh</Text>
                    </View>
                </Pressable>
                {(context.isListingDone) ? (
                    <ScrollView style={{marginBottom: 140, marginTop: 15}}>
                        {(context.devices.length) ? (
                            context.devices.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => 
                                <Pressable key={item.id} style={styles.cardBody} onPress={() => {
                                    mqtt.subscribe(`/${item.id}/sensor`, {
                                        item:  item,
                                        onSelect: onSelect,
                                    })
                                }}>
                                    <View style={{paddingHorizontal: 10}}>
                                        <Image
                                            style={styles.iconSize}
                                            source={require('../../assets/aquarium.png')}/>
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={styles.recentText}>{item.name}</Text>
                                        <Text style={styles.recentSubText}>Type: {item.type}</Text>
                                    </View>
                                </Pressable>
                            )
                        ) : (
                            <View style={styles.indicateView}>
                                <Text style={styles.recentText}>No devices are found.</Text>
                            </View>
                        )}
                    </ScrollView>
                ) : (
                    <View style={styles.indicateView}>
                        <ActivityIndicator size="large" color="blue" />
                        <Text style={styles.recentText}>Getting list of devices...</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const requestFineLocation = async (props) => {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]).then(
        (granted) => {
            if (granted['android.permission.ACCESS_FINE_LOCATION']
                && granted['android.permission.ACCESS_COARSE_LOCATION']
                && granted['android.permission.BLUETOOTH_SCAN']
                && granted['android.permission.BLUETOOTH_ADVERTISE']
                && granted['android.permission.BLUETOOTH_CONNECT']
                === 'granted') {
                props.navigation.navigate('Add Device');
            } else {
                // Permission denied
                Alert.alert('Access Denied. Please go to settings to enable permissions.')
            }
        }
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
        marginTop: 25,
        marginBottom: 64
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: "bold"
    },
    cardBody: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        flexDirection: 'row'
    },
    recentText: {
        fontSize: 20,
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
      marginBottom: 5,
    },
    iconSize: {
      width: 70,
      height: 70,
    },
    indicateView: {
        justifyContent: "center",
        alignItems: "center",
        height: 350
    },
});