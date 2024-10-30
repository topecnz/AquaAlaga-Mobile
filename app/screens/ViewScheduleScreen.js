import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput, Platform } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { ApiContext } from '../../server/Api';

function ViewScheduleScreen(props) {
    const context = useContext(ApiContext);
    const [name, setName] = useState(props.route.params.name);
    const [timer, setTimer] = useState(props.route.params.timer);
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(props.route.params.time));
    const [repeat, setRepeat] = useState(props.route.params.repeat);

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };

    return (
        <SafeAreaView  style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Name</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder='Schedule Name'
                        /> 
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Time</Text>
                    <Pressable style={styles.cardBody} onPress={showPicker}>
                    <View>
                        <Text style={styles.recentText}>{date.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})}</Text>
                    </View>
                    
                    
                    </Pressable>
                    {isPickerShow && (
                        <DateTimePicker
                        value={date}
                        mode={'time'}
                        display={'spinner'}
                        is24Hour={false}
                        onChange={onChange}
                        />
                    )}
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Repeat</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={repeat}
                            onValueChange={(itemValue, itemIndex) =>
                                setRepeat(itemValue)
                            }>
                            <Picker.Item label="Once" value="once" />
                            <Picker.Item label="Daily" value="daily" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Feed Timer</Text>
                    <View style={styles.sliderView}>
                        <Text style={styles.recentText}>{timer}s</Text>
                        <Slider
                            style={{flex: 1}}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            value={timer}
                            onValueChange={setTimer}
                            minimumTrackTintColor="#0E79B4"
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                </View>
                <Pressable onPress={() => context.updateSchedule(
                    props.route.params.id,
                    name,
                    date.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric'}),
                    repeat,
                    timer,
                    context.device.id,
                    props
                )}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Update</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => context.deleteSchedule(
                    props.route.params.id,
                    props
                )}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Delete</Text>
                    </View>
                </Pressable>
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
        marginBottom: 24
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
      marginVertical: 3
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ACACAC",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5 
    },
    picker: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
    },
    sliderView: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        width: "100%",
    }
});

export default ViewScheduleScreen;