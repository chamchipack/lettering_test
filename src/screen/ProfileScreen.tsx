import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

export default function ProfileScreen() {
  const webViewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
