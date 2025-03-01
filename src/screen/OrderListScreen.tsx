import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';
import NavigationBar from '../navigation/NavigationBar';

export default function OrderListScreen() {
  const webViewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="order-list" />
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
