import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import NaverMap from '../components/Location/Navermap';
import NavigationBar from '../navigation/NavigationBar';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

export default function LocationScreen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="location" />
      {/* <NaverMap /> */}
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
