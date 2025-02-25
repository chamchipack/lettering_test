import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import WebView from 'react-native-webview';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useWebViewMessage} from 'react-native-react-bridge';
import useMessageHandler from './useMessageHandler';

interface WebViewComponentProps {
  uri: string;
}

const WebViewComponent = forwardRef(({uri}: WebViewComponentProps, ref) => {
  const webViewRef = useRef<WebView>(null);
  const {messageConverter} = useMessageHandler();
  const {onMessage} = useWebViewMessage(message => {
    messageConverter(message);
  });

  const [loading, setLoading] = useState(true);

  // ✅ 상위 컴포넌트에서 WebView의 postMessage를 호출할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      webViewRef.current?.postMessage(JSON.stringify(message));
    },
  }));

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F39E9E" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        cacheEnabled={true}
        source={{uri: `http://192.168.0.11:9500/application/${uri}`}}
        javaScriptEnabled={true}
        onMessage={onMessage}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        originWhitelist={['*']}
        mixedContentMode="always"
        onError={e => {
          console.log(e);
        }}
        cacheMode="LOAD_CACHE_ELSE_NETWORK" // 캐시가 있으면 사용, 없으면 네트워크에서 로드
      />
    </>
  );
});

export default WebViewComponent;

const styles = StyleSheet.create({
  container: {flex: 1},
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
