import React, {useRef} from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../navigation/NavigationBar';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const scrollY = useRef(new Animated.Value(0)).current; // 🔹 스크롤 위치 값

  const checkAsyncStorage = async () => {
    try {
      if (webViewRef.current) {
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
  };

  // ✅ 스크롤에 따라 배경색 부드럽게 변경 (0~100: F39E9E, 100~150: FFF)
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100, 150], // ✅ 구간 설정
    outputRange: ['#F39E9E', '#F39E9E', '#FFFFFF'], // ✅ 0~100은 F39E9E, 100~150은 점진적으로 FFF
    extrapolate: 'clamp', // ✅ 범위를 초과하지 않도록 설정
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false}, // ✅ 배경색 변경을 위해 `false`
  );

  return (
    <View style={styles.container}>
      {/* ✅ 상단 부분 (애니메이션 적용) */}
      <Animated.View style={[styles.container, {backgroundColor}]}>
        <SafeAreaView style={styles.container}>
          <CustomWebViewComponent
            ref={webViewRef}
            uri="home"
            onLoadActive={checkAsyncStorage}
            onScroll={handleScroll} // ✅ 스크롤 이벤트 적용
          />
        </SafeAreaView>
      </Animated.View>

      {/* ✅ 하단 부분 (흰색으로 고정) */}
      <SafeAreaView style={styles.bottomArea}>
        <NavigationBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomArea: {
    backgroundColor: '#FFFFFF',
  },
});
