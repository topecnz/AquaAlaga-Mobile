import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';

function NotificationScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>My First Fish Tank</Text>
                    <Text style={styles.markText}>Mark all as read</Text>
                    <ScrollView style={{marginBottom: 120}}>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.recentText}>Successful Feeding - 08:00 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.recentSubText}>2 hours ago</Text>
                            </View>
                        </View>
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
        marginBottom: 32
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
    markText: {
        textAlign: "right",
        marginVertical: 5,
        color: "#0E79B4"
    }
});

export default NotificationScreen;