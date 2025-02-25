import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';

export default function SettingScreen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="setting" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
