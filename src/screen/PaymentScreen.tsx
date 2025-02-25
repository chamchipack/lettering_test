import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import useMessageHandler from './webview/useMessageHandler';
import {useWebViewMessage} from 'react-native-react-bridge';

export default function PaymentScreen() {
  const {messageConverter} = useMessageHandler();

  const {onMessage} = useWebViewMessage(message => {
    console.log(message);
  });
  return (
    <View style={styles.container}>
      <CustomWebViewComponent uri="payments" onListenMessage={onMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
