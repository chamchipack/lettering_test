import React, {useCallback, useRef, useState} from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../navigation/NavigationBar';
import {useFocusEffect} from '@react-navigation/native';

const DEFAULT_BACKGROUND = ['#FFD3C6', '#FFD3C6', '#FFFFFF'];
export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const scrollY = useRef(new Animated.Value(0)).current; // 🔹 스크롤 위치 값
  const [background, setBackground] = useState<string[]>([
    '#FFD3C6',
    '#FFD3C6',
    '#FFFFFF',
  ]);

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
    outputRange: background, // ✅ 0~100은 F39E9E, 100~150은 점진적으로 FFF
    extrapolate: 'clamp', // ✅ 범위를 초과하지 않도록 설정
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false}, // ✅ 배경색 변경을 위해 `false`
  );

  const onNavigationChange = async (event: any) => {
    const {url = ''} = event;
    const location = extractLastPath(url);
    if (location !== 'home') setBackground(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
    else setBackground(DEFAULT_BACKGROUND);
  };

  const extractLastPath = (url: string): string | null => {
    try {
      if (!url || typeof url !== 'string') {
        throw new Error('URL이 유효하지 않음');
      }

      // ✅ 상대 URL이거나 `http://` 없이 들어오는 경우 처리
      const matchedUrl = url.match(/^https?:\/\/[^\/]+(\/.*)$/);
      if (!matchedUrl) {
        console.warn('⚠ 상대 URL 감지됨 또는 URL 형식 오류:', url);
        return null;
      }

      const pathname = matchedUrl[1]; // ✅ "http://example.com/application/home" → "/application/home"
      const pathSegments = pathname.split('/').filter(Boolean); // 빈 요소 제거

      return pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1]
        : null;
    } catch (error) {
      console.error('Invalid URL:', url, error);
      return null;
    }
  };

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
            onNavigationChange={onNavigationChange}
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
