import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView, PermissionsAndroid } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';

export default function DeviceScreen(props) {
    const context = useContext(ApiContext);
    useEffect(() => {
        context.getDevices()
   }, []);
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
                <ScrollView style={{marginBottom: 120, marginTop: 25}}>
                    {/* <Pressable style={styles.cardBody} onPress={() => {
                        props.navigation.navigate('BottomTab')
                    }}>
                        <View style={{paddingHorizontal: 10}}>
                            <Image
                                style={styles.iconSize}
                                source={require('../../assets/aquarium.png')}/>
                        </View>
                        <View style={{padding: 10}}>
                            <Text style={styles.recentText}>My First Fish Tank</Text>
                            <Text style={styles.recentSubText}>Online</Text>
                        </View>
                    </Pressable> */}
                    {context.devices.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => 
                        <Pressable key={item.id} style={styles.cardBody} onPress={() => {
                            context.setDevice(item);
                            props.navigation.navigate('BottomTab');
                        }}>
                            <View style={{paddingHorizontal: 10}}>
                                <Image
                                    style={styles.iconSize}
                                    source={require('../../assets/aquarium.png')}/>
                            </View>
                            <View style={{padding: 10}}>
                                <Text style={styles.recentText}>{item.name}</Text>
                                <Text style={styles.recentSubText}>Type: {item.type}</Text>
                                <Text style={styles.recentSubText}>Status: Online</Text>
                            </View>
                        </Pressable>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const requestFineLocation = async (props) => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // You can now use react-native-wifi-reborn
        props.navigation.navigate('Add Device')
    } else {
        // Permission denied
        Alert.alert('Access Denied. Please go to settings to enable location.')
    }
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
        marginTop: 50,
        marginBottom: 32
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
    },
    iconSize: {
      width: 80,
      height: 80,
    },
});