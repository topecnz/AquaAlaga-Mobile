import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ReportScreen from '../screens/ReportScreen';
import ControlScreen from '../screens/ControlScreen';
import { Ionicons } from '@expo/vector-icons';
import ScheduleScreen from '../screens/ScheduleScreen';
import ViewScheduleScreen from '../screens/ViewScheduleScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import { ApiContext } from '../../server/Api';
import ViewDeviceScreen from '../screens/ViewDeviceScreen';

const Tab = createBottomTabNavigator();

function BottomTab(props) {
    const context = useContext(ApiContext);
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
            }}
            screenListeners={{
                state: (e) => {
                    // Do something with the state

                    // Report
                    if (e.data.state.index == 1) {
                        context.getReports(context.device.id)
                    }

                    //Schedule
                    if (e.data.state.index == 3) {
                        context.getSchedules(context.device.id)
                    }
                },
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='home' color={color} size={32}/>
                )
            }}  
            />
            <Tab.Screen name="Reports" component={ReportScreen} options={{
                tabBarLabel: 'Reports',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='document-text' color={color} size={32}/>
                )
            }}  
            />
            <Tab.Screen name="Controls" component={ControlScreen} options={{
                tabBarLabel: 'Controls',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='options' color={color} size={32}/>
                )
            }}  
            />
            <Tab.Screen name="Schedule Navigator" component={ScheduleNavigator} options={{
                tabBarLabel: 'Schedules',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='time' color={color} size={32}/>
                )
            }} listeners={{
                tabPress: e => {
                    // context.getSchedules();
                }
            }}  
            />
            <Tab.Screen name="Settings" component={ViewDeviceScreen} options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='cog-outline' color={color} size={32}/>
                )
            }}  
            />
        </Tab.Navigator>
    );
}

export default BottomTab;

const Stack = createStackNavigator();

function ScheduleNavigator(props) {  
    const context = useContext(ApiContext);  
    return (
        <Stack.Navigator initialRouteName='Schedules' screenOptions={{headerShown: false}} screenListeners={{}}>
            <Stack.Screen name="Schedules"  component={ScheduleScreen}/>
            <Stack.Screen name="View Schedule"  component={ViewScheduleScreen} />
            <Stack.Screen name="Add Schedule"  component={AddScheduleScreen} />
        </Stack.Navigator>
    )
}
