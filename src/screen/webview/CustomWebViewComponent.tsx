import React, {forwardRef, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {useWebViewMessage} from 'react-native-react-bridge';
import useMessageHandler from './useMessageHandler';

interface CustomWebViewComponentProps {
  uri?: string;
  onLoadActive?: () => void;
  onListenMessage?: (e: WebViewMessageEvent) => void;
  onScroll?: (event: any) => void;
  onNavigationChange?: (event: any) => void;
}

// const domain = 'https://lettering.chamchipack.com/application/';
const domain = 'http://192.168.0.16:9500/application/';
const CustomWebViewComponent = forwardRef<WebView, CustomWebViewComponentProps>(
  (
    {
      uri = '',
      onLoadActive = () => {},
      onListenMessage,
      onScroll,
      onNavigationChange,
    },
    ref,
  ) => {
    const localRef = useRef<WebView>(null);
    const webViewRef = (ref as React.MutableRefObject<WebView>) || localRef; // ✅ ref가 없을 경우 localRef 사용

    const {messageConverter} = useMessageHandler();

    const {onMessage} = useWebViewMessage(message => {
      console.log(message);
      // messageConverter(message);
      messageConverter(message).then((rs: any) => {
        if (message.type === 'LOCATION' && rs?.latitude && rs.longitude) {
          webViewRef.current?.postMessage(JSON.stringify(rs) || 'Guest');
        }
      });
    });

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          cacheEnabled={true}
          source={{uri: `${domain}${uri}`}}
          onMessage={onListenMessage ? onListenMessage : onMessage}
          onLoadEnd={onLoadActive}
          onError={e => console.error('WebView Load Error:', e)}
          onScroll={onScroll} // ✅ 수정된 타입 적용
          onNavigationStateChange={onNavigationChange}
        />
      </View>
    );
  },
);

export default CustomWebViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
