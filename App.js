import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ApiProvider from './server/Api';

import StackNav from './app/navigations/StackNav';
import MqttProvider from './server/Mqtt';

export default function App() {
  return (
    <ApiProvider>
        <MqttProvider>
          <NavigationContainer>
            <StackNav/>
          </NavigationContainer>
        </MqttProvider>
    </ApiProvider>
  );
}

registerRootComponent(App);
