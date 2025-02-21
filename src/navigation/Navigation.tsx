import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import StackNavigator from './StackNavigator';
import NavigationBar from './NavigationBar';

function MainNavigator() {
  const navigationRef = useNavigationContainerRef(); // ✅ 네비게이션 참조 생성

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
        <NavigationBar navigationRef={navigationRef} />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default MainNavigator;
