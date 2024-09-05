import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ApiProvider from './server/Api';

import StackNav from './app/navigations/StackNav';

export default function App() {
  return (
    <ApiProvider>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
    </ApiProvider>
  );
}

registerRootComponent(App);
