import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ApiContext } from '../../server/Api';
import axios from 'axios';
import WifiManager from "react-native-wifi-reborn";

function LinkDeviceScreen(props) {
    const context = useContext(ApiContext);
    const [type, setType] = useState('Indoor');
    const [isLinked, setISLinked] = useState(false);
    const [deviceName, setDeviceName] = useState(props.route.params.item.SSID);

    useEffect(() => {
        connectDevice();
    })

    const connectDevice = async () => {
        WifiManager.getCurrentWifiSSID().then(
            (ssid) => {
                console.log(ssid);
            },
            () => {
                console.log('Error');
            }
        )
        // WifiManager.connectToSSID(item.SSID).then(
        //     () => {
        //         console.log('Connected!')
        //     },
        //     () => {
        //         console.log('Connection Failed.')
        //     }
        // )
    }

    const linkDevice = async () => {
        axios.post('http://192.168.4.1/link', {
            test: 'test'
        }).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Setup Device Information</Text>
                    <View style={{marginTop: 20}}>
                        <View>
                            <Text>Device Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setDeviceName}
                                value={deviceName}
                                placeholder='Device Name'
                            />
                        </View>
                        <View style={styles.gap}>
                            <Text>Type</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={type}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setType(itemValue)
                                    }>
                                    <Picker.Item label="Indoor" value="Indoor" />
                                    <Picker.Item label="Outdoor" value="Outdoor" />
                                </Picker>
                            </View>
                        </View>
                        <Pressable onPress={() => linkDevice()}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Link</Text>
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
      marginVertical: 5
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ACACAC",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5 
    },
    gap: {
        marginVertical: 10
    },
    picker: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
    },
});

export default LinkDeviceScreen;