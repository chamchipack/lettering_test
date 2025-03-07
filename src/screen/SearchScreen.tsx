import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import WebViewComponent from './webview/WebviewContainer';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import NavigationBar from '../navigation/NavigationBar';
import CustomHeader from '../components/Input/CustomHeader';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomHeader /> */}
      <CustomWebViewComponent uri="search" />
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0', // 회색 배경
    paddingHorizontal: 10, // 내부 여백
    borderRadius: 8, // 둥근 테두리 (선택)
    borderWidth: 0, // 보더 없음
  },
});
