import {Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function AppleLoginButton() {
  return (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => console.log('애플 로그인')}>
      <Image
        source={require('../../../image/appleid_button.png')}
        style={styles.socialImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
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
