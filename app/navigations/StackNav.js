import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import DeviceScreen from '../screens/DeviceScreen';
import BottomTabMain from './BottomTabMain';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import LinkDeviceScreen from '../screens/LinkDeviceScreen';
import FirstSetupScreen from '../screens/FirstSetupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ScanWifiScreen from '../screens/ScanWifiScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ResetScreen from '../screens/ResetScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';


const Stack = createStackNavigator();

function StackNav(props) {
    return (
        <Stack.Navigator initialRouteName='Landing' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Email Verification" component={VerificationScreen} />
            <Stack.Screen name="BottomTabMain" component={BottomTabMain} />
            <Stack.Screen name="First Setup" component={FirstSetupScreen} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Add Device" component={AddDeviceScreen} />
            <Stack.Screen name="Connect to Wifi" component={ScanWifiScreen} />
            <Stack.Screen name="Link Device" component={LinkDeviceScreen} />
            <Stack.Screen name="Reset Password" component={ResetScreen} />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
}

export default StackNav;