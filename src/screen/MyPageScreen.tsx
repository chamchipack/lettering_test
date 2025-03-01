import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import NavigationBar from '../navigation/NavigationBar';

export default function MyPageScreen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="mypage" />
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
