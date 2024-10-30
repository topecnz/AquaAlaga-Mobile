import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import DeviceScreen from '../screens/DeviceScreen';
import BottomTabMain from './BottomTabMain';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import LinkDeviceScreen from '../screens/LinkDeviceScreen';

const Stack = createStackNavigator();

function StackNav(props) {
    return (
        <Stack.Navigator initialRouteName='Landing' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="BottomTabMain" component={BottomTabMain} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Add Device" component={AddDeviceScreen} />
            <Stack.Screen name="Link Device" component={LinkDeviceScreen} />
        </Stack.Navigator>
    );
}

export default StackNav;