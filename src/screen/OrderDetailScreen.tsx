import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {toQueryString, parseRouteParams} from '../config/util'; // ✅ 유틸 함수 import
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';

interface OrderDetailParams {
  orderId: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: OrderDetailParams = {orderId: ''};

export default function OrderDetailScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<OrderDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({orderId: params.orderId});
  const webViewUri = `order-detail?${queryString}`;

  return (
    <View style={styles.container}>
      <CustomWebViewComponent ref={webViewRef} uri={webViewUri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
