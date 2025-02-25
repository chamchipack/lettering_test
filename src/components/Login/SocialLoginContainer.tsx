import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import KakaoLoginButton from './kakao/KakaoLoginButton';
import AppleLoginButton from './apple/AppleLoginButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp, RootStackParamList} from '../../navigation/module/type';

export default function SocialLoginContainer() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <ChevronLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>로그인</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.description}>
          간편하게 소셜로그인을 이용해보세요!
        </Text>

        <View style={styles.buttonContainer}>
          <KakaoLoginButton />

          <AppleLoginButton />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 12,
    alignItems: 'center',
  },
});
