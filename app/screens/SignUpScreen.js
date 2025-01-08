import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Alert, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../server/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainGradient from '../components/MainGradient';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import PasswordValidate from 'react-native-password-validate-checklist';

export default function SignUpScreen(props) {
    const context = useContext(ApiContext);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [validated, setValidated] = useState(false)

    useEffect(()=> {
        context.checker();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View>
                        <Text style={styles.labelTitle}>Username</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            placeholder='Enter Username'
                        />
                        <View>
                        {(username.length >= 6) ? (
                            !context.checkers.find(user => user.username === username.trim()) ? (
                                <Text style={{color: "green"}}>Available!</Text>
                            ) : (
                                <Text style={{color: "red"}}>Username is already taken.</Text>
                            )
                        ): (
                            username.length ? (
                                <Text style={{color: "red"}}>Username must contain at least 6 characters</Text>
                            ) : (
                                <Text style={{color: "red"}}>* Required</Text>
                            )
                        )}
                        </View>
                    </View>
                    <View style={styles.gap}>
                        <Text style={styles.labelTitle}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder='Enter Email'
                            keyboardType='email-address'
                        />
                        <View>
                        {(/\S+@\S+\.\S+/.test(email)) ? (
                            !context.checkers.find(user => user.email === email.trim()) ? (
                                <Text style={{color: "green"}}>Available!</Text>
                            ) : (
                                <Text style={{color: "red"}}>Email is already taken.</Text>
                            )
                        ): (
                            email.length ? (
                                <Text style={{color: "red"}}>Email must be in a valid format</Text>
                            ) : (
                                <Text style={{color: "red"}}>* Required</Text>
                            )
                        )}
                        </View>
                    </View>
                    <View style={styles.gap}>
                        <Text style={styles.labelTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder='Enter New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.gap}>
                        <Text style={styles.labelTitle}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder='Enter Confirm Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                    <PasswordValidate
                        newPassword={password}
                        confirmPassword={confirmPassword}
                        validationRules={[
                        {
                            key: 'MIN_LENGTH',
                            ruleValue: 9,
                            label: 'Should contain more than 9 characters',
                        },
                        //   {
                        //     key: 'MAX_LENGTH',
                        //     ruleValue: 15,
                        //     label: 'Should contain max of 15 characters',
                        //   },
                        {key: 'LOWERCASE_LETTER'},
                        {key: 'UPPERCASE_LETTER'},
                        {key: 'NUMERIC'},
                        {key: 'PASSWORDS_MATCH'},
                        {key: 'SPECIAL_CHARS'},
                        ]}
                            onPasswordValidateChange={validatedBoolean =>
                            setValidated(validatedBoolean)
                        }
                    />
                    </View>
                    <View style={styles.gap}>
                        <Pressable onPress={() => {
                            console.log(validated)
                            if (!validated || !email.length || !username.length) {
                                Alert.alert("Error: Check your fields");
                                return
                            } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
                                Alert.alert("Error: Email must be in a valid format");
                            } else if (username.length.trim() < 6) {
                                Alert.alert("Error: Username must contain at least 6 characters");
                            }
                            context.signup({
                                username: username.trim(),
                                password: password,
                                email: email.trim()
                            }, props)
                        }}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Signup</Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
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
    cardSubTitle: {
        fontSize: 16,
        color: "grey"
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
    deviceOverview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    aquariumIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
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