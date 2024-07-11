import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function MainGradient(props) {
    return (
            <LinearGradient
            colors={['#00aaff', 'transparent']}
            style={styles.background}
            />
       );
   }
   
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 40
    },
});

export default MainGradient;