import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import useMessageHandler from './webview/useMessageHandler';
import {useWebViewMessage} from 'react-native-react-bridge';

export default function PaymentScreen() {
  const {messageConverter} = useMessageHandler();

  const {onMessage} = useWebViewMessage(message => {
    console.log(message);
  });
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent uri="payments" onListenMessage={onMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
