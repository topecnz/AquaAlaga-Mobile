import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

function NotificationScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);
    const [device, setDevice] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <View style={styles.gap}>
                        <Text style={styles.labelTitle}>Device</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={device}
                                onValueChange={(itemValue, itemIndex) => {
                                        console.log(itemValue);
                                        context.getNotifications(itemValue);
                                        setDevice(itemValue);
                                    }
                                }>
                                <Picker.Item label="-- Select Device --" value="" enabled={false}/>
                                {context.devices.sort((a,b) => a.name.localeCompare(b.name)).map((item, index) =>
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                )}
                                {/* <Picker.Item label="Indoor" value="Indoor" />
                                <Picker.Item label="Outdoor" value="Outdoor" /> */}
                            </Picker>
                        </View>
                    </View>
                    <ScrollView style={{marginBottom: 120}}>
                        <Pressable onPress={() => context.deleteNotifications(device)}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Clear Notification</Text>
                            </View>
                        </Pressable>
                        {(mqtt.notifications.length)? (
                            mqtt.notifications.sort((a, b) => a.created_at.localeCompare(b.created_at)).reverse().map((item, index) => 
                            <Pressable key={item.id} style={styles.cardBody}>
                                <View style={{flexDirection: "column"}}>
                                    <View>
                                        <View>
                                            <Text style={styles.recentText}>{item.message}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.recentSubText}>{moment(new Date(item.created_at)).fromNow()}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        )) : (
                            <View style={styles.indicateView}>
                                <Text style={styles.recentText}>No notifications for this device</Text>
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
        marginVertical: 60,
    },
    card: {
        marginBottom: 180
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
        marginVertical: 3,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    recentText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    recentSubText: {
        fontSize: 12,
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
      marginBottom: 20
    },
    markText: {
        textAlign: "right",
        marginVertical: 5,
        color: "#0E79B4"
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
    },
    indicateView: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default NotificationScreen;