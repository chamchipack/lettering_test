import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';
import CustomHeader from '../components/Input/CustomHeader';

interface OrderDetailParams {
  query?: string;
  date?: string;
}

const DEFAULT_PARAMS: OrderDetailParams = {query: '', date: ''};

export default function StoreListScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<OrderDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  // ✅ `params.date`와 `params.query`가 있을 때만 쿼리스트링에 추가
  const queryObject: Record<string, string> = {};
  if (params.query) queryObject.query = params.query;
  if (params.date) queryObject.date = params.date;

  const queryString = toQueryString(queryObject);
  const webViewUri = `seller-list?${queryString}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomHeader /> */}
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
