import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';

interface OrderDetailParams {
  query: string;
  date: string;
}

const DEFAULT_PARAMS: OrderDetailParams = {query: '', date: ''};

export default function StoreListScreen() {
  const route = useRoute();

  const params = parseRouteParams<OrderDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({query: params.query, date: params.date});
  const webViewUri = `store-list?${queryString}`;

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
