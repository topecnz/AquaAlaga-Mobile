import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingGradient from '../components/LandingGradient';
import { ApiContext } from '../../server/Api';
import { MqttContext } from '../../server/Mqtt';

function LandingScreen(props) {
    const context = useContext(ApiContext);
    const mqtt = useContext(MqttContext);
    const [first, setIsFirst] = useState(false);
    useEffect(() => {
       storage()
    }, []);

    const storage = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirst');
        console.log(value);
        if (!JSON.parse(value)) {
          try {
            const user = await AsyncStorage.getItem('account');
            console.log(user);
            if (!JSON.parse(user)) { 
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
            } else {
              context.session(JSON.parse(user), props, mqtt)
            }
          } catch (e) {

          }
        } else {
          setIsFirst(true);
        }
      } catch (e) {

      }
    }

    const isClicked = async () => {
      try {
        await AsyncStorage.setItem('isFirst', JSON.stringify(false));
        props.navigation.navigate('Login')
      } catch (e) {

      }
    }
    
    return (
      <View style={styles.container}>
        <LandingGradient/>
        {(first) ? (
          <View style={styles.containerInner}>
            <View style={{  }}>
              <Text style={styles.welcomeFont}>Welcome to</Text>
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.logoShadow}>
                <Image
                  style={styles.logoSize}
                  resizeMode='contains'
                  source={require('../../assets/logo.png')}/>
              </View>
              <Text style={styles.titleFont}>AquaAlaga</Text>
            </View>
            <View>
              <Pressable onPress={() => isClicked()}>
                <View style={styles.button}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Get Started</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (null)}
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
  welcomeFont: {
    fontSize: 24
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
  }
});

export default LandingScreen;