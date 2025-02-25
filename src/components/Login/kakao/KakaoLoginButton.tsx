import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';

export default function KakaoLoginButton() {
  const signInWithKakao = async () => {
    // 소셜로그인 최초 진입점

    try {
      const token = await login();
      const profile = await getKakaoProfile();

      const form = {
        provider: 'kakao',
        social_id: profile.id.toString(),
        name: profile.nickname,
        profile_image: profile.profileImageUrl,
        refresh_token: token.refreshToken,
        refresh_expires_at: token.refreshTokenExpiresAt,
      };

      console.log(form);
    } catch (e) {
      console.log(e);
    }
  };

  return null;
  // <TouchableOpacity style={styles.socialButton} onPress={signInWithKakao}>
  //   <Image
  //     source={require('../../../image/kakao_login_large_wide.png')}
  //     style={styles.socialImage}
  //     resizeMode="cover"
  //   />
  // </TouchableOpacity>
}

const styles = StyleSheet.create({
  socialButton: {
    width: '90%', // ✅ 버튼 전체 너비
    height: 50, // ✅ 고정 높이
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // ✅ 이미지가 넘치는 것 방지
  },
  socialImage: {
    width: '100%', // ✅ 부모 버튼 크기에 맞춤
    height: '100%', // ✅ 버튼 크기와 동일하게 설정
  },
});
