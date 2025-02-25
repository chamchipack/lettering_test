import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const checkAsyncStorage = async () => {
    try {
      if (webViewRef.current) {
        // const nickname = await AsyncStorage.getItem('nickname');
        // webViewRef.current?.postMessage(nickname || 'Guest');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
  };

  const animatedValue = useRef(new Animated.Value(1)).current; // 🔹 애니메이션 값
  const [inputVisible, setInputVisible] = useState(true); // 인풋 보이기 상태
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    // const yOffset = event.nativeEvent.contentOffset.y;
    // if (yOffset > 50 && inputVisible) {
    //   setInputVisible(false);
    //   Animated.timing(animatedValue, {
    //     toValue: 0,
    //     duration: 100,
    //     useNativeDriver: false,
    //   }).start();
    // } else if (yOffset <= 50 && !inputVisible) {
    //   setInputVisible(true);
    //   Animated.timing(animatedValue, {
    //     toValue: 1,
    //     duration: 100,
    //     useNativeDriver: false,
    //   }).start();
    // }
  };

  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: animatedValue,
            height: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 40], // 0일 때 숨김, 40일 때 표시
            }),
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="입력하세요"
          placeholderTextColor="#999"
        />
      </Animated.View> */}
      <CustomWebViewComponent
        ref={webViewRef}
        uri="home"
        onLoadActive={checkAsyncStorage}
        onScroll={handleScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    width: '100%',
    overflow: 'hidden', // 높이 변경 시 부드럽게 숨김 효과
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
