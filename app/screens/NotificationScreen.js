import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../../server/Api';
import axios from 'axios';


function NotificationScreen(props) {
  //const context = useContext(ApiContext);
  const [notifications, setNotifications] = useState([]);
  const instance = axios.create({
        baseURL: 'http://192.168.1.4:8000/'

    });

  const getNotifications = async () => {
      try {
          const response = await instance.get('notification');
          setNotifications(response.data); 
      } catch (error) {
          console.error("Error fetching notifications:", error);
      }
  };

  useEffect(() => {
      getNotifications(); 
  }, []);

  
    
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
    return `${formattedDate} ${formattedTime}`;
  };


  return (
    <SafeAreaView style={styles.container}>
      <MainGradient />
      <View>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>My First Fish Tank</Text>
          <Text style={styles.markText}>Mark all as read</Text>
          
          
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.cardBody}>
              {notifications.map((item, index) => (
                <View key={index} style={styles.notificationCard}>
                 
                  <Text style={styles.recentText}>{item.message}</Text>
                 
                  <Text style={styles.timestampText}>{formatDateTime(item.created_at)}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 36,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 40,
  },
  body: {
    flex: 1,
    marginTop: 20,
    },
  card: {
        marginBottom: 32
    },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold"
},
recentText: {
    fontSize: 20,
    fontWeight: "bold"
    },
markText: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 20,
    },
timestampText: {
    fontSize: 16,
    color: "grey"
    },
 
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestampText: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
    },
    buttonMargin: {
        marginVertical: 2
    },
    button: {
      height: 50,
      width: "auto",
      backgroundColor: "#0E79B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
  markText: {
        textAlign: "right",
        marginVertical: 5,
        color: "#0E79B4"
    }
});

export default NotificationScreen;