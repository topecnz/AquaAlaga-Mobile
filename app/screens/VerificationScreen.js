import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Alert, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../server/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainGradient from '../components/MainGradient';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import PasswordValidate from 'react-native-password-validate-checklist';

export default function VerificationScreen(props) {
    const context = useContext(ApiContext);
    const [isSent, setIsSent] = useState(false);
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const newEmail = async () => {
        setIsChanged(true)
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert("Error: Email must be in a valid format");
            setIsChanged(false);
            return;
        }
        context.changeEmail({
            id: context.account.id,
            email: email
        }, props, false, setModalVisible, setIsChanged)
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    {(isSent) ? (
                        <View>
                            <View style={styles.gap}>
                                <Text style={{fontSize: 18}}>Your verification code has been sent to {context.account.email}. Please check your mailbox.</Text>
                            </View>
                            <View>
                                <Text style={styles.labelTitle}>Verification Code</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setCode}
                                    value={code}
                                    placeholder='Enter Code'
                                    keyboardType='numeric'
                                />
                            </View>
                            
                            <View style={styles.gap}>
                                <Pressable onPress={() => {
                                    context.post_verify(context.account.id, code, props)
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Verify</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => {
                                    setModalVisible(true);
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Change Email</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => {
                                    context.verify(context.account.id, isSent, setIsSent);
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Resend Code</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => {
                                    context.logout(props);
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Logout</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View>
                                <Text style={{fontSize: 18}}>Send verification code to {context.account.email}.</Text>
                            </View>
                            <View style={styles.gap}>
                                <Pressable onPress={() => {
                                    context.verify(context.account.id, false, setIsSent);
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Send Code</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => {
                                    context.logout(props);
                                }}>
                                    <View style={styles.button}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Logout</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    <Modal 
                        animationType="fade" 
                        transparent={true} 
                        visible={modalVisible} 
                        onRequestClose={() => setModalVisible(false)} > 
                        <View style={styles.overlay}>
                            <View style={styles.modalView}>
                            <Text style={styles.recentText}>Enter your email</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                keyboardType='email-address' />
                            <View style={styles.buttonContainer}>
                                { (!isChanged) ? (
                                <View>
                                    <Pressable onPress={() => { console.log('Email: ' + email); newEmail();}}>
                                        <View style={styles.button}>
                                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20, padding: 1 }}>OK</Text>
                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => {setModalVisible(false); setEmail('');}}>
                                        <View style={styles.button}>
                                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20, padding: 1 }}>Cancel</Text>
                                        </View>
                                    </Pressable>
                                    </View> 
                                    ) : (
                                    <View style={{marginVertical: 30, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator size="large" color="blue"/>
                                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Changing...</Text>
                                    </View>
                                    )

                                }
                            </View>
                            </View>
                        </View>
                    </Modal> 
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
      marginVertical: 3,
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
    },
    indicateView: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: { 
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5 ,
    width: '100%',
    marginBottom: 10,
  },
});