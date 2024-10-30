import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, Switch } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ApiContext } from '../../server/Api';

function ScheduleScreen(props) {
    // const [isEnabled, setIsEnabled] = useState(false);
    const context = useContext(ApiContext);
    useEffect(() => {
        console.log('test')
        context.getSchedules(context.device.id)
   }, []);
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <Pressable onPress={() => props.navigation.navigate('Add Schedule')}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Add Schedule</Text>
                    </View>
                </Pressable>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{context.device.name}</Text>
                    <ScrollView style={{marginBottom: 200}}>
                        {context.schedules.sort((a, b) => a.time.localeCompare(b.time)).map((item, index) => 
                            <Pressable key={item.id} style={styles.cardBody} onPress={() => props.navigation.navigate('View Schedule', {time: "1970-01-01 "+item.time+":00", timer: item.timer, repeat: item.repeat, name: item.name, id: item.id})}>
                                <View style={{flexDirection: "column"}}>
                                    <View>
                                        <View>
                                            <Text style={styles.recentText}>{new Date("1970-01-01 "+item.time+":00").toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.recentSubText}>{item.repeat}, {item.timer}s {index}</Text>
                                        </View>
                                    </View>
                                    <View style={{position: "absolute", right: 0}}>
                                        <Switch
                                            trackColor={{false: '#767577', true: '#00aaff'}}
                                            thumbColor={item.is_enable ? '#fff' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => {
                                                context.toggleSchedule(item.id, props)
                                            }}
                                            value={item.is_enable}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        {/* <Pressable style={styles.cardBody} onPress={() => props.navigation.navigate('View Schedule', {time: "1970-01-01 08:00:00", timer: 2, repeat: "1", name: "tank sched"})}>
                            <View style={{flexDirection: "column"}}>
                                <View>
                                    <View>
                                        <Text style={styles.recentText}>08:00 AM</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.recentSubText}>Once, 2s</Text>
                                    </View>
                                </View>
                                <View style={{position: "absolute", right: 0}}>
                                    <Switch
                                        trackColor={{false: '#767577', true: '#00aaff'}}
                                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setIsEnabled(!isEnabled)}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.cardBody} onPress={() => props.navigation.navigate('View Schedule', {time: "1970-01-01 14:00:00", timer: 2, repeat: "1", name: "tank sched"})}>
                            <View style={{flexDirection: "column"}}>
                                <View>
                                    <View>
                                        <Text style={styles.recentText}>02:00 PM</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.recentSubText}>Once, 2s</Text>
                                    </View>
                                </View>
                                <View style={{position: "absolute", right: 0}}>
                                    <Switch
                                        trackColor={{false: '#767577', true: '#00aaff'}}
                                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setIsEnabled(!isEnabled)}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.cardBody} onPress={() => props.navigation.navigate('View Schedule', {time: "1970-01-01 22:00:00", timer: 2, repeat: "1", name: "tank sched"})}>
                            <View style={{flexDirection: "column"}}>
                                <View>
                                    <View>
                                        <Text style={styles.recentText}>10:00 PM</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.recentSubText}>Once, 2s</Text>
                                    </View>
                                </View>
                                <View style={{position: "absolute", right: 0}}>
                                    <Switch
                                        trackColor={{false: '#767577', true: '#00aaff'}}
                                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setIsEnabled(!isEnabled)}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </Pressable> */}
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
        marginVertical: 5,
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
      marginBottom: 15
    },
});

export default ScheduleScreen;