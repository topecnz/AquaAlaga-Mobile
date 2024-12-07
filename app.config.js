module.exports = {
    name: "AquaAlaga-Mobile",
    slug: "AquaAlaga-Mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
  },
  android: {
      adaptiveIcon: {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#000000"
      },
      package: "com.topecnz.AquaAlagaMobile",
      permissions: [
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_SCAN",
        "android.permission.BLUETOOTH_ADVERTISE",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.SCHEDULE_EXACT_ALARM",
        "android.permission.CHANGE_WIFI_STATE",
        "android.permission.CHANGE_NETWORK_STATE",
        "android.permission.ACCESS_WIFI_STATE",
        "android.permission.ACCESS_NETWORK_STATE"
      ]
  },
  plugins: [
      [
        "react-native-wifi-reborn",
        {
          fineLocationPermission: true
        }
      ],
      [
        "expo-location",
        {
          isAndroidForegroundServiceEnabled: true
        }
      ]
  ],
  extra: {
    eas: {
        "projectId": "c456562d-87ab-4a29-a888-f363924b605e"
    }
  },
};
