import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {parseRouteParams, toQueryString} from '../config/util';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';

interface PolicyDetailParams {
  type: string;
  id: string;
}

// ✅ 기본값 설정
const DEFAULT_PARAMS: PolicyDetailParams = {type: '', id: ''};

export default function InterestScreen() {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const params = parseRouteParams<PolicyDetailParams>(
    route.params,
    DEFAULT_PARAMS,
  );

  const queryString = toQueryString({type: params.type, id: params.id});
  const webViewUri = `policy/policy-detail?${queryString}`;

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
