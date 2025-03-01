import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

interface SellerDetailParams {
  sellerId: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: SellerDetailParams = {sellerId: ''};

export default function SellereDetailScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<SellerDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({sellerId: params.sellerId});
  const webViewUri = `seller-detail?${queryString}`;

  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri={webViewUri} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
