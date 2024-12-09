import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import PasswordValidate from 'react-native-password-validate-checklist';

function ChangePasswordScreen(props) {
    const context = useContext(ApiContext);
    const [currentPass, setCurrentPass] = useState('');
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
                <View style={styles.card}>
                    <View style={{marginTop: 20}}>
                            <View>
                                <Text style={styles.labelTitle}>Current Password</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setCurrentPass}
                                    value={currentPass}
                                    placeholder='Enter Current Password'
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.gap}>
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
                        <Pressable onPress={() => {
                            if (!validated) {
                                Alert.alert("Error: Password not matched.");
                                return
                            }
                            context.changePassword({
                                id: context.account.id,
                                current_password: currentPass,
                                password: password
                            }, props)
                        }}>
                            <View style={styles.button}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Update</Text>
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

export default ChangePasswordScreen;