import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomWebViewComponent from './webview/CustomWebViewComponent';
import WebView from 'react-native-webview';
import useMessageHandler from './webview/useMessageHandler';
import {useWebViewMessage} from 'react-native-react-bridge';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';

export default function LoginScreen() {
  const webViewRef = useRef<WebView>(null);

  const {messageConverter} = useMessageHandler();

  const signInWithKakao = async () => {
    // 소셜로그인 최초 진입점

    try {
      const token = await login();
      const profile = await getKakaoProfile();

      const form = {
        provider: 'kakao',
        userId: profile.id.toString(),
        nickname: profile.nickname,
        profile_image: profile.profileImageUrl,
        // refresh_token: token.refreshToken,
        // refresh_expires_at: token.refreshTokenExpiresAt,
      };

      webViewRef.current?.postMessage(JSON.stringify(form));

      console.log(form);
    } catch (e) {
      console.log(e);
    }
  };

  const {onMessage} = useWebViewMessage(message => {
    messageConverter(message).then(rs => {
      if (message.type === 'LOGIN') {
        if (rs === 'kakao') signInWithKakao();
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <CustomWebViewComponent
        ref={webViewRef}
        uri="login"
        onListenMessage={onMessage}
        // onLoadActive={checkAsyncStorage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
