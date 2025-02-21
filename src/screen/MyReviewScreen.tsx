import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';

export default function MyReviewScreen() {
  return (
    <View style={styles.container}>
      <WebViewComponent uri="review/individual" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
