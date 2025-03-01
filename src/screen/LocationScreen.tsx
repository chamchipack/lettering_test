import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import NaverMap from '../components/Location/Navermap';
import NavigationBar from '../navigation/NavigationBar';

export default function LocationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NaverMap />
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
