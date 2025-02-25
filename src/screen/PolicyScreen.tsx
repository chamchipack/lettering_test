import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';

interface PolicyParams {
  policy: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: PolicyParams = {policy: ''};

export default function InterestScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<PolicyParams>(route.params, DEFAULT_PARAMS);

  const queryString = toQueryString({policy: params.policy});
  const webViewUri = `policy?${queryString}`;

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
