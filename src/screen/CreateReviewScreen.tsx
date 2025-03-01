import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';

export default function CreateReview() {
  const webViewRef = useRef<WebView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="create-review" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
