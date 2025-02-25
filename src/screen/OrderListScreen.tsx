import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

export default function OrderListScreen() {
  const webViewRef = useRef<WebView>(null);
  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="order-list" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
