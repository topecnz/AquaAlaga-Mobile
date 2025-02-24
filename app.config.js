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
        "android.permission.SCHEDULE_EXACT_ALARM"
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
    env: {
        BASE_URL: "http://192.168.137.159:8000/",
        MQTT_URL: "192.168.137.159",
        MQTT_USERNAME: "aquaalaga",
        MQTT_PASSWORD: "IsdaIsSafe4321"
    },
    eas: {
        "projectId": "c456562d-87ab-4a29-a888-f363924b605e"
    }
  },
};
