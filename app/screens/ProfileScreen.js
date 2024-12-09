import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import PasswordValidate from 'react-native-password-validate-checklist';

function ProfileScreen(props) {
    const context = useContext(ApiContext);
    
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Profile Info</Text>
                    <View style={{marginTop: 20}}>
                        <View>
                            <Text style={styles.labelTitle}>Username</Text>
                            <Text style={{fontSize: 16}}>{context.account.username}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.labelTitle}>Email</Text>
                            <Text style={{fontSize: 16}}>{context.account.email}</Text>
                        </View>
                        <View style={styles.gap}>
                            <Pressable onPress={() => {
                                props.navigation.navigate("Change Password");
                            }}>
                                <View style={styles.button}>
                                    <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Change Password</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => context.logout(props)}>
                                <View style={styles.button}>
                                    <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Logout</Text>
                                </View>
                            </Pressable>
                        </View>
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
        marginTop: 5
    },
    labelTitle: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default ProfileScreen;