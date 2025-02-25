import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';

export default function CouponScreen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri="mypage/coupon" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
