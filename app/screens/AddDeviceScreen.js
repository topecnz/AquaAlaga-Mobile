import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView, PermissionsAndroid } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import WifiManager from "react-native-wifi-reborn";
// import * as Location from "expo-location";

export default function AddDeviceScreen(props) {
  const context = useContext(ApiContext);
  var [isScanned, setIsScanned] = useState(false);
  var [wifiList, setWifilist] = useState([]);

  useEffect(() => {
      getWifiList();
  }, []);

  const getWifiList = async () => {
      setIsScanned(false);
      const enabled = await WifiManager.isEnabled();

      if (!enabled) {
        await WifiManager.isEnabled(true);
      }
      
      var data = await WifiManager.reScanAndLoadWifiList().then((r) => {
        setWifilist(r.length ? r.filter(isFound) : []);
      }, (e) => {
        setWifilist([]);
        Alert.alert(e.toString());
      });
  }

  const isFound = (device) => {
    return device.SSID == 'AquaAlagaV1';
  } 

  return (
    <SafeAreaView style={styles.container}>
      <MainGradient/>
      <View>
          <Text style={styles.headerText}>{props.route.name}</Text>
      </View>
      <View style={styles.card}>
          <Pressable onPress={async () => await getWifiList()}>
              <View style={styles.button}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 20 }}>Scan</Text>
              </View>
          </Pressable>
          { (isScanned) ? (
              <ScrollView>
              {(wifiList.length) ? (wifiList.sort((a, b) => b.level - a.level).map((item, index) =>
                <Pressable key={index} style={styles.cardBody} onPress={() => props.navigation.navigate('Link Device', {item: item})}>
                  <View style={{flexDirection: 'column'}}>
                    <View>
                      <View>
                        <Text style={styles.recentText}>{item.SSID}</Text>
                      </View>
                      <View>
                        <Text style={styles.recentSubText}>{item.BSSID}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )) : (
                <Text style={styles.recentText}>No devices are found.</Text>
              )}
            </ScrollView>
            ) : (
              <Text style={styles.recentText}>Scanning....</Text>
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
});