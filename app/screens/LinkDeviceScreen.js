import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput, NativeModules, NativeEventEmitter, ActivityIndicator } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ApiContext } from '../../server/Api';
import axios from 'axios';
import WifiManager from "react-native-wifi-reborn";
import TetheringManager from '@react-native-tethering/wifi';
import { Buffer } from 'buffer';

function LinkDeviceScreen(props) {
    const context = useContext(ApiContext);
    const [type, setType] = useState('Tap Water');
    const [breed, setBreed] = useState('Goldfish');
    const [otherBreed, setOtherBreed] = useState(undefined);
    const [temp, setTemp] = useState('27');
    const [ph, setPh] = useState('7');
    const [isLinkingDone, setIsLinkingDone] = useState(true);
    const [deviceName, setDeviceName] = useState("AA-V001");
    const [url, setUrl] = useState(props.route.params.item.url);

    useEffect(() => {
        // testing only
        // axios.get(`${url}/scan`).then(() => {
        //     Alert.alert("Test Scanned");
        // })
        return () => {
            disconnect();
        }
    }, [])

    const disconnect = async () => {
        console.log("Cleaning up...");

        WifiManager.disconnect().then(() => {
            console.log("Disconnected");
        }, (e) => {
            Alert.alert(e);
        })
    }

    const connectDevice = async () => {
        setIsLinkingDone(false);
        axios.post(`${url}/link`, {
            account_id: context.account.id,
            name: deviceName,
            type: type,
            breed: breed,
            temp: temp,
            ph: ph
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((r) => {
            if (r.data.code == 200) {
                Alert.alert("Success!")
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabMain' }]
                });
            } else if (r.data.code == 409) {
                Alert.alert('Device name already existed.')
            } else {
                Alert.alert("Something went wrong! Try again.");
            }
            setIsLinkingDone(true);
        }, (e) => {
            Alert.alert("Something went wrong! Try again.");
            setIsLinkingDone(true);
        })
    }

    const setRecommendedData = (value) => {
        for (let i in context.breed_data) {
            if (context.breed_data[i].name == value) {
                setTemp(context.breed_data[i].temp);
                setPh(context.breed_data[i].ph);
            }
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
                            <Text>Type of Water</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={type}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setType(itemValue)
                                    }>
                                    <Picker.Item label="Tap Water" value="Tap Water" />
                                    <Picker.Item label="Well Water" value="Well Water" />
                                    <Picker.Item label="Rainwater" value="Rainwater" />
                                    <Picker.Item label="Natural Waterways" value="Natural Waterways" />
                                    <Picker.Item label="Distilled Water" value="Distilled Water" />
                                    <Picker.Item label="Deionized Water" value="Deionized Water" />
                                    <Picker.Item label="RO Water" value="RO Water" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.labelTitle}>Breed</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={breed}
                                    onValueChange={(itemValue, itemIndex) => {
                                            setBreed(itemValue)
                                            setOtherBreed((itemValue != 'Custom') ? null : 'Custom' )
                                            setRecommendedData(itemValue);
                                        }
                                    }>
                                    <Picker.Item label="Custom" value="Custom" />
                                    {
                                        context.breed_data.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => 
                                            <Picker.Item key={index} label={item.name} value={item.name} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        {
                            (otherBreed != undefined) ? (
                                <View style={styles.gap}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setOtherBreed}
                                        value={otherBreed}
                                        placeholder='Custom'
                                    />
                                </View>
                            ) : (null)
                        }
                        <View style={styles.gap}>
                            <Text>Temperature</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={temp}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTemp(itemValue)
                                    }>
                                    <Picker.Item label="18" value="18" />
                                    <Picker.Item label="19" value="19" />
                                    <Picker.Item label="20" value="20" />
                                    <Picker.Item label="21" value="21" />
                                    <Picker.Item label="22" value="22" />
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
                            <Text>pH Level</Text>
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
                                    const breedData = (breed != undefined) ? breed : otherBreed;
                                    if (!ph || !temp || !type || !deviceName || !breedData) {
                                        Alert.alert("Please enter the required fields!");
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