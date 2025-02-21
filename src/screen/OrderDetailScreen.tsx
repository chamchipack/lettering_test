import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {toQueryString, parseRouteParams} from '../config/util'; // ✅ 유틸 함수 import

interface OrderDetailParams {
  orderId: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: OrderDetailParams = {orderId: ''};

export default function OrderDetailScreen() {
  const route = useRoute();

  const params = parseRouteParams<OrderDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({orderId: params.orderId});
  const webViewUri = `order-detail?${queryString}`;

  return (
    <View style={styles.container}>
      <WebViewComponent uri={webViewUri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
