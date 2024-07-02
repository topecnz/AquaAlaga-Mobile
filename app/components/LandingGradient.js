import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LandingGradient(props) {
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
    height: 500,
  }
})

export default LandingGradient;
