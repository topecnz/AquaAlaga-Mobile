import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import LandingGradient from '../components/LandingGradient';
import { ApiContext } from '../../server/Api';

function SignupScreen(props) {
    const context = useContext(ApiContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleSignup = () => {
        console.log("Signup initiated for email:", email);
        fetch('http://192.168.56.1:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Alert.alert("Signup successful! Please check your email for verification.");
                    setIsVerified(true);
                } else {
                    Alert.alert("Signup failed:", data.message);
                }
            })
            .catch(error => {
                console.error("Error during signup:", error);
                Alert.alert("An error occurred. Please try again.");
            });
    };

    const handleVerifyOtp = () => {
        console.log("OTP verification initiated for OTP:", otp);
        // Add OTP verification logic here
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <LandingGradient />
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
                        onChangeText={setEmail}
                        value={email}
                        placeholder='Email Address'
                        keyboardType="email-address"
                    />
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
                    {isVerified ? (
                        <Pressable onPress={handleVerifyOtp}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Verify OTP</Text>
                            </View>
                        </Pressable>
                    ) : (
                        <Pressable onPress={handleSignup}>
                            <View style={styles.buttonSignup}>
                                <Text style={styles.buttonText}>Signup</Text>
                            </View>
                        </Pressable>
                    )}
                </View>
                <View>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('Login');
                        }}
                        style={styles.signupText}
                    >
                        Have an account? Login
                    </Text>
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
    buttonSignup: {
        height: 50,
        backgroundColor: "#0E79B4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
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
    signupText: {
        textAlign: "center",
        marginVertical: 5,
        color: "#0E79B4",
    },
});

export default SignupScreen;
