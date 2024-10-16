import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView, PermissionsAndroid, NativeModules, NativeEventEmitter, ActivityIndicator } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import TetheringManager from '@react-native-tethering/wifi';
import Geolocation from '@react-native-community/geolocation';
import WifiManager from "react-native-wifi-reborn";
import BleManager from "react-native-ble-manager";
// import * as Location from "expo-location";

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function AddDeviceScreen(props) {
  const context = useContext(ApiContext);
  var [isScanned, setIsScanned] = useState(false);
  var [deviceList, setDevicelist] = useState([]);
  var [isListened, setIsListened] = useState(false);

  useEffect(() => {
    if (!isListened) {
      BleManagerEmitter.addListener(
        'BleManagerStopScan',
        () => {

          // filter all data scanned
          let newSet = new Set()

          const newData = deviceList.filter(item => {
            const isDuplicate = newSet.has(item.id)
            newSet.add(item.id)
            return (!isDuplicate) ? true : false;
          })


          setDevicelist(newData)

          setIsScanned(true);
          console.log('Scan is stopped');
        },
      );
      BleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (peripheral) => {
          let newData = deviceList

          newData.push(peripheral)
          setDevicelist(newData);
        }
      );
      console.log('Listener activated.');
      setIsListened(true);
    }
    getDiscoverableDevice();
  }, []);

  

  const getDiscoverableDevice = async () => {
    BleManager.enableBluetooth().then(
      () => {
          BleManager.start({showAlert: false}).then(() => {
              console.log('BleManager initialized');
              setIsScanned(false);
              setDevicelist([]);    
          
              const data = BleManager.scan([], 10).then(
                () => {
                  console.log('Scanning....')
                }
              )        
          });
      },
      () => {
        setIsScanned(true);
          Alert.alert('Please turn on bluetooth.')
      }  
    );
  }
  
  const connect = async (item) => {
    // console.log(item.advertising.serviceUUIDs[0]);
    BleManager.connect(item.id)
      .then(() => {
        console.log("Connected");
        props.navigation.navigate('Link Device', {item: item});

      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainGradient/>
      <View>
          <Text style={styles.headerText}>{props.route.name}</Text>
      </View>
      <View style={styles.card}>
          <Pressable onPress={async () => await getDiscoverableDevice()}>
              <View style={styles.button}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Scan</Text>
              </View>
          </Pressable>
          { (isScanned) ? (
              <ScrollView>
              {(deviceList.length) ? (deviceList.sort((a, b) => a.id.localeCompare(b.id)).map((item, index) =>
                <Pressable key={index} style={styles.cardBody} onPress={() => connect(item)}>
                  <View style={{flexDirection: 'column'}}>
                    <View>
                      <View>
                        <Text style={styles.recentText}>{(!item.advertising.localName)? 'Unknown Device' : item.advertising.localName}</Text>
                      </View>
                      <View>
                        <Text style={styles.recentSubText}>{item.id}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )) : (
                <View style={styles.indicateView}>
                  <Text style={styles.recentText}>No devices are found.</Text>
                </View>
              )}
            </ScrollView>
            ) : (
              <View style={styles.indicateView}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={styles.recentText}> Scanning....</Text>
              </View>
              
            )
          }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
      marginBottom: 100
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
    borderRadius: 10,
    marginBottom: 20
  },
  iconSize: {
    width: 80,
    height: 80,
  },
  indicateView: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  }
});