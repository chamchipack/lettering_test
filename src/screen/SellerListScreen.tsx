import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

interface OrderDetailParams {
  query: string;
  date: string;
}

const DEFAULT_PARAMS: OrderDetailParams = {query: '', date: ''};

export default function StoreListScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<OrderDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({query: params.query, date: params.date});
  const webViewUri = `seller-list?${queryString}`;

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
