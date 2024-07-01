import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';

function LoginScreen(props) {
    return (
        <View style={styles.container}>
      {/* <LinearGradient
        colors={['#00aaff', 'transparent']}
        style={styles.background}
      /> */}
        <View style={styles.containerInner}>
          <View style={{  }}>
            <Text style={styles.welcomeFont}>Welcome to</Text>
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.logoShadow}>
              <Image
                style={styles.logoSize}
                resizeMode='contains'
                source={require('./assets/logo.png')}/>
            </View>
            <Text style={styles.titleFont}>AquaAlaga</Text>
          </View>
          <View>
            <Pressable onPress={() => Alert.alert("pressed!")}>
              <View style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Login</Text>
              </View>
            </Pressable>
          </View>
        </View>
    </View>
    );
}

export default LoginScreen;