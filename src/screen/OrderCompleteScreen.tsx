import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import useMessageHandler from './webview/useMessageHandler';
import {useWebViewMessage} from 'react-native-react-bridge';

export default function OrderCompleteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent uri="order-complete" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
