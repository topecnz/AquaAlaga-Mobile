import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recent Events</Text>
                    <View style={styles.cardBody}>
                        <View>
                            <Text style={styles.recentText}>Successful Feeding</Text>
                        </View>
                        <View>
                            <Text style={styles.recentSubText}>08:00 AM - My First Fish Tank</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Overview</Text>
                    <View style={styles.cardBody}>
                        <View>
                            <Text style={styles.recentText}>My First Fish Tank</Text>
                        </View>
                        <View>
                            <Text style={styles.recentSubText}>Temperature: Normal</Text>
                            <Text style={styles.recentSubText}>pH Level: Basic</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Shortcuts</Text>
                    <View style={styles.cardBody}>
                        <Pressable style={styles.buttonMargin} onPress={() => Alert.alert("Pressed")}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Hold to Feed</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => props.navigation.navigate('BottomTab', {
                            screen: 'Schedule Navigator',
                            params: {
                                screen: 'View Schedule'
                              }
                        })}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>View Schedules</Text>
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
    },
});

export default HomeScreen;