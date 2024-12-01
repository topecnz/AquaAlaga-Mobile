import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput, NativeModules, NativeEventEmitter, ActivityIndicator } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ApiContext } from '../../server/Api';
import axios from 'axios';
import WifiManager from "react-native-wifi-reborn";
import TetheringManager from '@react-native-tethering/wifi';
import BleManager from "react-native-ble-manager";
import { Buffer } from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function LinkDeviceScreen(props) {
    const context = useContext(ApiContext);
    const [type, setType] = useState('Indoor');
    const [breed, setBreed] = useState('');
    const [temp, setTemp] = useState('27');
    const [ph, setPh] = useState('7');
    const [isLinkingDone, setIsLinkingDone] = useState(true);
    const [isSet, setIsSet] = useState(false);
    const [deviceName, setDeviceName] = useState(props.route.params.item.advertising.localName);

    useEffect(() => {
        if (!isSet) {
            BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', ({value, peripheral, characteristic, service}) => {
                // Display notification message
    
                console.log(value);
                value = Buffer.from(value).toString('utf-8')
                console.log(value);
    
                if (value == 'true') {
                    disconnect();
                    Alert.alert('Success!');
                } else if (value == 'existed') {
                    Alert.alert('Device name already existed.')
                } else if (value == 'failed_request') {
                    Alert.alert('Linking device into the server failed. Please try again.')
                } else {
                    Alert.alert('Please try again.')
                }

                setIsLinkingDone(true);
              });
            console.log('Listener activated.');
            setIsSet(true);
        }
        return () => {
            disconnect();
        }
    }, [])

    const disconnect = async () => {
        BleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
        BleManagerEmitter.removeAllListeners('BleManagerStopScan');
        // BleManagerEmitter.removeAllListeners('BleManagerConnectPeripheral');
        // BleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
        BleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic')
        BleManager.disconnect(props.route.params.item.id).then(
            () => {
                console.log('Disconnected.');
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabMain' }]
                });
            },
            (e) => {
                console.log(e);
            }
        )
    }

    const connectDevice = async () => {
        setIsLinkingDone(false);

        // Validate
        if (deviceName.length > 16) {
            Alert.alert('The device name maximum characters is 16.');
            setIsLinkingDone(true);
            return;
        }

        if (breed.length > 16) {
            Alert.alert('The fish breed maximum characters is 16.');
            setIsLinkingDone(true);
            return;
        }

        BleManager.retrieveServices(props.route.params.item.id).then(
            (info) => {
                BleManager.startNotification(info.id, info.services[2].uuid, info.characteristics[3].characteristic)
                    .then(() => {
                    // Display confirmation message
                    console.log(`Subscribed to ${info.id} - ${info.services[2].uuid} - ${info.characteristics[3].characteristic}`);
                    })
                    .catch((err) => {
                    // Update error message
                        Alert.alert(err.message)
                    });
                data = {
                    deviceName: deviceName,
                    type: type,
                    breed: breed,
                    temp: temp,
                    ph: ph
                    
                }
                
                writeData(info, 'dn|'+ data.deviceName);    
                writeData(info, 't|'+ data.type);
                writeData(info, 'b|'+ data.breed);    
                writeData(info, 'data|'+ data.temp + ":" + data.ph);    

            }
        )

        const writeData = async (info, data) => {
            BleManager.write(info.id, info.services[2].uuid, info.characteristics[3].characteristic, Buffer.from(data).toJSON().data)
                .then(() => {
                    console.log("Write success");
                })
                .catch((error) => {
                    console.log("Write failed", error);
                });
        }

        const readData = async (info) => {
            let res = null;
            BleManager.read(info.id, info.services[2].uuid, info.characteristics[3].characteristic)
                .then((data) => {
                    res = Buffer.from(data).toString();
                    console.log("Read " + res);
                    BleManager.disconnect(info.id).then(
                        () => {
                            console.log('Disconnected.');
                        },
                        (e) => {
                            console.log(e);
                        }
                    )
                })
                .catch((error) => {
                    console.log("Read failed", error);
                });

            return (res.length) ? true : false;
        }
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
                        <View>
                            <Text>Fish Breed</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setBreed}
                                value={breed}
                                placeholder='Fish Breed'
                            />
                        </View>
                        <View style={styles.gap}>
                            <Text>Temperature</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={temp}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTemp(itemValue)
                                    }>
                                    <Picker.Item label="23" value="23" />
                                    <Picker.Item label="24" value="24" />
                                    <Picker.Item label="25" value="25" />
                                    <Picker.Item label="26" value="26" />
                                    <Picker.Item label="27" value="27" />
                                    <Picker.Item label="28" value="28" />
                                    <Picker.Item label="29" value="29" />
                                    <Picker.Item label="30" value="30" />
                                    <Picker.Item label="21" value="21" />
                                    <Picker.Item label="32" value="32" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text>Temperature</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={ph}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setPh(itemValue)
                                    }>
                                    <Picker.Item label="6" value="6" />
                                    <Picker.Item label="7" value="7" />
                                    <Picker.Item label="8" value="8" />
                                </Picker>
                            </View>
                        </View>
                        { (isLinkingDone) ? (
                                <Pressable onPress={() => {
                                    if (!ph || !temp || !type || !deviceName || !breed) {
                                        Alert.alert("Please check fields!");
                                        return;
                                    }
                                    connectDevice();
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Link</Text>                                
                                    </View>
                                </Pressable>
                            ) : (
                                <View style={{marginVertical: 30, justifyContent: "center", alignItems: "center"}}>
                                    <ActivityIndicator size="large" color="blue"/>
                                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Linking...</Text>
                                </View>
                            )
                        }
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
        fontSize: 16,
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