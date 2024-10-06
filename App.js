import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ApiProvider from './server/Api';
import { useEffect, useRef } from 'react';
import { registerForPushNotificationsAsync } from './NotificationService';
import StackNav from './app/navigations/StackNav';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getPushToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await sendPushTokenToServer(token); 
      }
    };
    getPushToken();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received in foreground:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification clicked:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const sendPushTokenToServer = async (token) => {
    try {
      await fetch('http://192.168.148.20:8000/register_push_token', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expo_token: token }),
      });
    } catch (error) {
      console.error('Error registering push token:', error);
    }
  };

  return (
    <ApiProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </ApiProvider>
  );
}

registerRootComponent(App);
