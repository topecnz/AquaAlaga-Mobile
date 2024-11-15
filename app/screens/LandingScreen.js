import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import LandingGradient from '../components/LandingGradient';
import { ApiContext } from '../../server/Api';

function LandingScreen(props) {
    const context = useContext(ApiContext);
    // useEffect(() => {
    //   console.log('test...' + context.isLoggedOn)
    //   if (context.isLoggedOn) {
    //     props.navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'BottomTab' }]
    //     })
    //   } 
    // }, []);
    
    return (
      <View style={styles.container}>
        <LandingGradient/>
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
            <Pressable onPress={() => props.navigation.navigate('Login')}>
              <View style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Get Started</Text>
              </View>
            </Pressable>
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