import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

function StackNav(props) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
    );
}

export default StackNav;