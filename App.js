import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
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
