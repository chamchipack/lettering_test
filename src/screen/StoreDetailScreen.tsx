import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

interface StoreDetailParams {
  storeId: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: StoreDetailParams = {storeId: ''};

export default function StoreDetailScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<StoreDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({storeId: params.storeId});
  const webViewUri = `store-detail?${queryString}`;

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
