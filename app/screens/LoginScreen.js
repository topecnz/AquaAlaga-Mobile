import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import LandingGradient from '../components/LandingGradient';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

function LoginScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <LandingGradient/>
            <ScrollView contentContainerStyle={styles.containerInner} keyboardShouldPersistTaps='handled'>
                <View style={styles.titleContainer}>
                    <View style={styles.logoShadow}>
                        <Image
                            style={styles.logoSize}
                            resizeMode='contain'
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                    <Text style={styles.titleFont}>AquaAlaga</Text>
                </View>
                <View style={styles.fields}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder='Username'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Pressable onPress={() => context.login(username, password, props, mqtt)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {
                        props.navigation.navigate('Signup')
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </View>
                    </Pressable>
                    <Text onPress={() => {
                    props.navigation.navigate('Reset Password')
                }} style={styles.forgotText}>Forgot Password</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    containerInner: {
        paddingHorizontal: 70,
        flexGrow: 1,
        justifyContent: 'center',
    },
    logoSize: {
        width: 93,
        height: 50,
    },
    logoShadow: {
        shadowColor: '#202020',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 50,
    },
    titleFont: {
        fontWeight: "bold",
        fontSize: 44,
    },
    button: {
        height: 50,
        backgroundColor: "#0E79B4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 3,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ACACAC",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    fields: {
        marginBottom: 20,
    },
    forgotText: {
        textAlign: "right",
        marginVertical: 5,
        color: "#0E79B4",
    },
});

export default LoginScreen;
