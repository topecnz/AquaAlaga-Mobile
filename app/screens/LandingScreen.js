import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import LandingGradient from '../components/LandingGradient';

function LandingScreen(props) {
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
    backgroundColor: "#0F6FA4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});

export default LandingScreen;