import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

function ViewDeviceScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);
    const [deviceName, setDeviceName] = useState(context.device.name);
    const [deviceType, setDeviceType] = useState(context.device.type);
    const [breed, setBreed] = useState(context.device.fish_breed);
    const [temp, setTemp] = useState(context.device.temperature.toString());
    const [ph, setPh] = useState(context.device.ph_level.toString());
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('');

    const deleteDevice = () => {
        mqtt.publish(`/${context.device.id}/delete`, "DELETE")
    }
    const updateDevice = () => {
        mqtt.publish(`/${context.device.id}/update`, "UPDATE")
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Information</Text>
                    <ScrollView style={{marginTop: 20, marginBottom: 70}}>
                        <View>
                            <Text style={styles.labelTitle}>Device Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setDeviceName}
                                value={deviceName}
                                placeholder='Device Name'
                            />
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.labelTitle}>Type</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={deviceType}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDeviceType(itemValue)
                                    }>
                                    <Picker.Item label="Indoor" value="Indoor" />
                                    <Picker.Item label="Outdoor" value="Outdoor" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.labelTitle}>Breed</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setBreed}
                                value={breed}
                                placeholder='Breed'
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
                                    <Picker.Item label="31" value="31" />
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
                        {/* <View style={styles.gap}>
                            <Text style={styles.recentText}>IP Address</Text>
                            <Text style={styles.recentText}>{context.device.ip_address}</Text>
                        </View> */}
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>MAC Address</Text>
                            <Text style={styles.recentText}>{context.device.mac_address}</Text>
                        </View>
                        {/* <View style={styles.gap}>
                            <Text style={styles.recentText}>Breed: {context.device.fish_breed}</Text>    
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Normal Temperature: {context.device.temperature}</Text>    
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>Normal pH: {context.device.ph_level}</Text>    
                        </View> */}
                        { (!isLoading) ? 
                            (
                                <View>
                                    <Pressable onPress={() => {
                                        setLoadingMsg("Updating...")
                                        setIsLoading(true);
                                        context.updateDevice(context.device, deviceName, deviceType, breed, temp, ph, setIsLoading, updateDevice)
                                    }}>
                                        <View style={styles.button}>
                                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Update</Text>
                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                            setLoadingMsg("Deleting...")
                                            setIsLoading(true);
                                            // mqtt.subscribe(`/${context.device.id}/delete`);
                                            // mqtt.publish(`/${context.device.id}/delete`, 'DELETE');
                                            context.deleteDevice(context.device.id, props, setIsLoading, deleteDevice);
                                        }}>
                                        <View style={styles.button}>
                                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Delete</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            ) : (
                                <View style={{marginVertical: 30, justifyContent: "center", alignItems: "center"}}>
                                    <ActivityIndicator size="large" color="blue"/>
                                    <Text style={{fontSize: 20, fontWeight: "bold"}}>{loadingMsg}</Text>
                                </View>
                            )
                        }
                    </ScrollView>
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
      marginVertical: 5
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5 
    },
    gap: {
        marginVertical: 10
    },
    picker: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5
    },
    labelTitle: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default ViewDeviceScreen;