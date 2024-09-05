import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, TextInput } from 'react-native';
import LandingGradient from '../components/LandingGradient';
import { ApiContext } from '../../server/Api';

function LoginScreen(props) {
    const context = useContext(ApiContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
        <LandingGradient/>
        <View style={styles.containerInner}>
            <View style={styles.titleContainer}>
                <View style={styles.logoShadow}>
                <Image
                    style={styles.logoSize}
                    resizeMode='contains'
                    source={require('../../assets/logo.png')}/>
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
                <Pressable onPress={() => context.login(username, password, props)}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Login</Text>
                    </View>
                </Pressable>
                <Text style={styles.forgotText}>Forgot Password</Text>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    containerInner: {
      marginTop: 0,
      paddingHorizontal: 70
    },
    logoSize: {
      width: 93,
      height: 50,
    },
    logoShadow: {
      shadowColor: '#202020',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 5,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 250
    },
    titleFont: {
      fontWeight: "bold",
      fontSize: 44
    },
    button: {
      height: 50,
      width: "auto",
      backgroundColor: "#0E79B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ACACAC",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5 
    },
    fields: {
        marginBottom: 20
    },
    forgotText: {
        textAlign: "right",
        marginVertical: 5,
        color: "#0E79B4"
    }
});

export default LoginScreen;