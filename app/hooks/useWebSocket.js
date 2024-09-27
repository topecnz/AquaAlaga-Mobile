import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const useWebSocket = (url, onMessage) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection opened");
    };

    socket.onmessage = async (event) => {
      const message = event.data;

      
      Alert.alert("New Notification", message);

      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Notification",
          body: message, 
        },
        trigger: null, 
      });

      
      if (onMessage) onMessage(message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]); 

  return { isConnected }; 
};

export default useWebSocket;
