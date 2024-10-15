import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ApiContext } from '../../server/Api';

function ViewDeviceScreen(props) {
    const context = useContext(ApiContext);
    const [deviceName, setDeviceName] = useState(context.device.name);
    const [deviceType, setDeviceType] = useState(context.device.type);
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Information</Text>
                    <View style={{marginTop: 20}}>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setDeviceName}
                                value={deviceName}
                                placeholder='Device Name'
                            />
                        </View>
                        <View style={styles.gap}>
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
                            <Text style={styles.recentText}>IP Address: {context.device.ip_address}</Text>    
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.recentText}>MAC Address: {context.device.mac_address}</Text>    
                        </View>
                        <Pressable onPress={() => {context.updateDevice(context.device, deviceName, deviceType, props)}}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Update</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => {context.deleteDevice(context.device.id, props)}}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Delete</Text>
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
        marginVertical: 5,
    },
});

export default ViewDeviceScreen;