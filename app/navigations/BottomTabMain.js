import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { ApiContext } from '../../server/Api';
import DeviceScreen from '../screens/DeviceScreen';

const Tab = createBottomTabNavigator();

function BottomTabMain(props) {
    const context = useContext(ApiContext);
    return (
        <Tab.Navigator initialRouteName='Device' screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
                paddingBottom: 10
            },
            tabBarStyle: {
                height: 70,
            }
            }}
            screenListeners={{
                state: (e) => {
                    // Do something with the state

                    // Device
                    if (e.data.state.index == 0) {
                        context.getDevices()
                    }
                },
            }}>
            <Tab.Screen name="Device" component={DeviceScreen} options={{
                tabBarLabel: 'Device',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='home' color={color} size={32}/>
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

export default BottomTabMain;
