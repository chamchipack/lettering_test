import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

export default function AddressSearchScreen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="address/search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
