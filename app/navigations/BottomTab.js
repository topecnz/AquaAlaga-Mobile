import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ReportScreen from '../screens/ReportScreen';
import ControlScreen from '../screens/ControlScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTab(props) {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
                paddingBottom: 10
            },
            tabBarStyle: {
                height: 70,
            }
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='home' color={color} size={32}/>
                )
            }}/>
            <Tab.Screen name="Reports" component={ReportScreen} options={{
                tabBarLabel: 'Reports',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='document-text' color={color} size={32}/>
                )
            }}/>
            <Tab.Screen name="Controls" component={ControlScreen} options={{
                tabBarLabel: 'Controls',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='options' color={color} size={32}/>
                )
            }}/>
            <Tab.Screen name="Notification" component={NotificationScreen} options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='notifications' color={color} size={32}/>
                )
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='person' color={color} size={32}/>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default BottomTab;
