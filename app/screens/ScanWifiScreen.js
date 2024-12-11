import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView, Modal, TextInput, PermissionsAndroid, NativeModules, NativeEventEmitter, ActivityIndicator, ToastAndroid } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import TetheringManager, { Network, Event, TetheringError } from '@react-native-tethering/wifi';
import WifiManager from 'react-native-wifi-reborn';
import axios from "axios";
// import * as Location from "expo-location";

export default function ScanWifiScreen(props) {
  const context = useContext(ApiContext);
  const [networks, setNetworks] = useState([]);
  const [isScanned, setIsScanned] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ssidName, setssidName] = useState('');
  const [url, setUrl] = useState("http://192.168.4.1:8000");
  const [isWifiConnected, setIsWifiConnected] = useState(false);

  useEffect(() => {
    checkCurrentSSID();
    return async () => {
      console.log("Cleaning up...");
      const ssid = await WifiManager.getCurrentWifiSSID();
      try {
        if (ssid == "AA-V001") {
          WifiManager.disconnect().then(() => {
            Alert.alert("Disconnected");
          }, (e) => {
            Alert.alert(e);
          })
        }
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    }
  }, []);


    const checkCurrentSSID = async () => { 
        try {
            ToastAndroid.show("Connecting....", ToastAndroid.LONG) 
            const ssid = await WifiManager.getCurrentWifiSSID();
            console.log(ssid); 
            // setIsConnected(true);
            // scanWifi();
            if (ssid === "AA-V001") {
                setIsConnected(true);
                ToastAndroid.show("Connected!", ToastAndroid.LONG)
                scanWifi();
            } else {
                WifiManager.connectToProtectedSSID("AA-V001", "", false, false).then(() => {
                    ToastAndroid.show("Connected to Local Network!", ToastAndroid.LONG)
                    setIsConnected(true);
                    scanWifi();
                }, (e) => {
                  ToastAndroid.show("Connection failed. Please try again.", ToastAndroid.LONG);
                })
            }
        } catch (error) { 
            console.error('Error getting current SSID:', error); 
        } 
    };

  const scanWifi = async () => {
    try {
      setIsScanned(false);
      axios.get(`${url}/scan`).then((r)=> {
        setNetworks(r.data)
        setIsScanned(true);
      }, (e) => {
        Alert.alert(e);
        setIsScanned(true);
      })
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG)
      console.log(error);
      setIsScanned(true);
    }
  }

  const connectWifi = async () => {
    setIsWifiConnected(true)
    var data = {
      ssid: ssidName,
      password: password
    }
    // Send the credentials to the device
    axios.post(`${url}/connect`, data, {
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
    }).then((r) => {
      if (r.data.code == 200) {
        WifiManager.connectToProtectedSSID(ssidName, password, false, false).then(() => {
          // ToastAndroid.show("Connected to Local Network!", ToastAndroid.LONG)
          setUrl(r.data.url);
          setIsWifiConnected(false);
          props.navigation.navigate('Link Device', {item: {
            name: ssidName,
            url: r.data.url
          }});
        }, (e) => {
          ToastAndroid.show("Connection failed. Please try again.", ToastAndroid.LONG);
          setIsWifiConnected(false);
          WifiManager.connectToProtectedSSID("AA-V001", "", false, false).then(() => {
              ToastAndroid.show("Connected to Local Network!", ToastAndroid.LONG)
              setIsConnected(true);
              scanWifi();
          }, (e) => {
            ToastAndroid.show("Connection failed. Please try again.", ToastAndroid.LONG);
          })
        })
        setPassword('');        
      }
      else {
        Alert.alert("Connection Failed")
        setPassword('');
        setIsWifiConnected(false);
        scanWifi();
      }
    }).catch((e) => {
      Alert.alert(e);
      setIsWifiConnected(false);
      setPassword('');
    })

    
  }


  return (
    <SafeAreaView style={styles.container}>
      <MainGradient/>
      <View>
          <Text style={styles.headerText}>{props.route.name}</Text>
      </View>
      <View style={styles.card}>
          
          {/* { (isScanned) ? (
              <ScrollView>
              {(networks.length) ? (networks.map((n, i) => (
                  <View
                    style={styles.networksWrapper}
                    key={i}
                  >
                    <Text style={{ color: '#000' }}>SSID: {n.ssid}</Text>
                    <Text style={{ color: '#000' }}>BSSID: {n.bssid}</Text>
                    <Text style={{ color: '#000' }}>capabilities: {n.capabilities}</Text>
                    <Text style={{ color: '#000' }}>frequency: {n.frequency}</Text>
                    <Text style={{ color: '#000' }}>level: {n.level}</Text>
                    <Text style={{ color: '#000' }}>timestamp: {n.timestamp}</Text>
                  </View>
              ))) : (
                <View style={styles.indicateView}>
                  <Text style={styles.recentText}>No devices are found.</Text>
                </View>
              )}
            </ScrollView>
            ) : (
              <View style={styles.indicateView}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={styles.recentText}>Scanning for Wi-Fi networks...</Text>
              </View>
              
            )
          } */}
          { (isConnected) ? (
            (isScanned) ? (
            <View>
                <Pressable onPress={async () => await scanWifi()}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Scan</Text>
                    </View>
                </Pressable>
                <ScrollView>
                {(networks.length) ? (networks.map((n, i) => (
                    <Pressable key={i} style={styles.cardBody} onPress={() => {
                        setssidName(n.ssid);
                        setModalVisible(true);

                    }}>
                  <View style={{flexDirection: 'column'}}>
                    <View>
                      <View>
                        <Text style={styles.recentText}>{(!n.ssid)? 'Hidden Network' : n.ssid}</Text>
                      </View>
                      <View>
                        <Text style={styles.recentSubText}>{n.bssid}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                ))) : (
                    <View style={styles.indicateView}>
                    <Text style={styles.recentText}>No devices are found.</Text>
                    </View>
                )}
                </ScrollView>
            </View>
            ) : (
              <View style={styles.indicateView}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={styles.recentText}>Scanning for Wi-Fi networks...</Text>
              </View>
              
            )
          ) : (
            <View>
                <Text style={styles.recentText}>Please Connect to AA-V001</Text>
                <Pressable onPress={async () => await checkCurrentSSID()}>
                    <View style={styles.button}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20, padding: 1 }}>Connect</Text>
                    </View>
                </Pressable>
            </View>
          )}
      </View>
      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)} > 
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.recentText}>Enter Password for {ssidName}</Text>
              <TextInput 
                secureTextEntry={true} 
                style={styles.input}
                onChangeText={setPassword}
                value={password} />
              <View style={styles.buttonContainer}>
                { (!isWifiConnected) ? (
                  <View>
                    <Pressable onPress={() => { console.log('Password: ' + password); connectWifi();}}>
                        <View style={styles.button}>
                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20, padding: 1 }}>OK</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {setModalVisible(false); setssidName('');}}>
                        <View style={styles.button}>
                            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20, padding: 1 }}>Cancel</Text>
                        </View>
                    </Pressable>
                      </View> 
                    ) : (
                      <View style={{marginVertical: 30, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size="large" color="blue"/>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Connecting...</Text>
                      </View>
                    )

                }
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  networksWrapper: {
    padding: 12, 
    backgroundColor: '#ccc', 
    marginVertical: 6
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 36
  },
  headerText: {
      fontSize: 40,
      fontWeight: "bold",
      paddingTop: 40
  },
  body: {
      marginVertical: 60
  },
  card: {
      marginTop: 50,
      marginBottom: 240
  },
  cardTitle: {
      fontSize: 28,
      fontWeight: "bold"
  },
  cardBody: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 16,
      marginVertical: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 2,
      flexDirection: 'row'
  },
  recentText: {
      fontSize: 20,
      fontWeight: "bold"
  },
  recentSubText: {
      fontSize: 16,
      color: "grey"
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
    borderRadius: 5,
    marginBottom: 5
  },
  iconSize: {
    width: 80,
    height: 80,
  },
  indicateView: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: { 
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5 ,
    width: '100%',
    marginBottom: 10,
  },
});