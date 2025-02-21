import React from 'react';
import {StyleSheet, View} from 'react-native';
import NaverMap from '../components/Location/Navermap';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <NaverMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
