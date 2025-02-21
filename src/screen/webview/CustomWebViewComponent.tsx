import React, {forwardRef, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {useWebViewMessage} from 'react-native-react-bridge';
import useMessageHandler from './useMessageHandler';

interface CustomWebViewComponentProps {
  uri?: string;
  onLoadActive?: () => void;
  onListenMessage?: (e: WebViewMessageEvent) => void;
}

const CustomWebViewComponent = forwardRef<WebView, CustomWebViewComponentProps>(
  ({uri = '', onLoadActive = () => {}, onListenMessage}, ref) => {
    const localRef = useRef<WebView>(null);
    const webViewRef = (ref as React.MutableRefObject<WebView>) || localRef; // ✅ ref가 없을 경우 localRef 사용

    const {messageConverter} = useMessageHandler();

    const {onMessage} = useWebViewMessage(message => {
      messageConverter(message);
    });

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          cacheEnabled={true}
          source={{uri: `http://192.168.0.11:9500/application/${uri}`}}
          onMessage={onListenMessage ? onListenMessage : onMessage}
          onLoadEnd={() => {
            onLoadActive();
          }}
          onError={e => {}}
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
