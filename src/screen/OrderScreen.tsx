import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

export default function OrderScreen() {
  const webViewRef = useRef<WebView>(null);
  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="order" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
