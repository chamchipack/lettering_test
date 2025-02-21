import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import TestWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';
import useMessageHandler from './webview/useMessageHandler';
import {useWebViewMessage} from 'react-native-react-bridge';

export default function LocationScreen() {
  const webViewRef = useRef<WebView>(null);

  const {messageConverter} = useMessageHandler();

  const {onMessage} = useWebViewMessage(message => {
    messageConverter(message).then(rs => {
      if (message.type === 'LOCATION' && rs?.latitude && rs.longitude) {
        webViewRef.current?.postMessage(JSON.stringify(rs) || 'Guest');
      }
    });
  });

  return (
    <View style={styles.container}>
      <TestWebViewComponent
        ref={webViewRef}
        uri="address"
        onListenMessage={onMessage}
        // onLoadActive={checkAsyncStorage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
