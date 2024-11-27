import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { ApiContext } from '../../server/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainGradient from '../components/MainGradient';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import PasswordValidate from 'react-native-password-validate-checklist';

export default function ResetPasswordScreen(props) {
    const context = useContext(ApiContext)
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [found, setFound] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <View style={styles.body}>
                {(!userId.length) ? 
                    (
                        <View>
                            <View>
                                <Text style={styles.labelTitle}>Find Username</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setUsername}
                                    value={username}
                                    placeholder='Username'
                                />
                            </View>
                            <View style={styles.gap}>
                            <Pressable onPress={() => {
                                    if (!username) {
                                        Alert.alert("Please enter username.")
                                        return;
                                    }
                                    context.findUsername(username, setUserId, setQuestion)
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Find</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        null
                    )
                }
                {(userId.length && !found) ? 
                (
                    <View>
                            <View>
                                <Text style={styles.labelTitle}>Security Question</Text>
                                <Text style={styles.recentSubText}>{question}</Text>
                            </View>
                            <View style={styles.gap}>
                                <Text style={styles.labelTitle}>Security Answer</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setAnswer}
                                    value={answer}
                                    placeholder='Answer'
                                />
                            </View>
                            <View style={styles.gap}>
                            <Pressable onPress={() => {
                                    context.securityCheck({
                                        id: userId,
                                        security_answer: answer
                                    }, setFound)
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Confirm</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                ) : (null)
                }
                {(found) ?
                    (
                        <View>
                            <View>
                                <Text style={styles.labelTitle}>New Password</Text>
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
                                    if (!validated) {
                                        Alert.alert("Error: Check your fields");
                                        return
                                    }
                                    context.resetPassword({
                                        id: userId,
                                        password: password
                                    }, props)
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Reset</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    ) : (null)

                }
            </View>
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
