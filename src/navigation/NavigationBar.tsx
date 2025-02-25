import {
  NavigationContainerRef,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Home, Search, MapPin, ClipboardList, User} from 'lucide-react-native';
import {RootStackParamList} from './module/type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const NAV_ITEMS = [
  {label: '메인', key: 'Home', path: 'home', Icon: Home},
  {label: '검색', key: 'Search', path: 'search', Icon: Search},
  {label: '주변', key: 'Location', path: 'location', Icon: MapPin},
  {
    label: '주문내역',
    key: 'OrderList',
    path: 'order-list',
    Icon: ClipboardList,
  },
  {label: '마이', key: 'MyPage', path: 'mypage', Icon: User},
  // {label: '결제', key: 'Payments', path: 'payments', Icon: User},
];

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const exception = NAV_ITEMS.map(({path = ''}) => path);

const NavigationBar = ({
  navigationRef,
}: {
  navigationRef: NavigationContainerRef<any>;
}) => {
  const navigation = useNavigation<NavigationProp>();

  const [currentRouteName, setCurrentRouteName] = useState('');

  // useEffect(() => {
  //   if (navigationRef?.getCurrentRoute) {
  //     setCurrentRouteName(navigationRef.getCurrentRoute()?.name ?? '');
  //   }
  // }, [navigationRef]);

  // ✅ 라우팅 처리
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      if (navigationRef?.getCurrentRoute) {
        setCurrentRouteName(navigationRef.getCurrentRoute()?.name ?? '');
      }
    });

    return unsubscribe;
  }, [navigation]);

  if (!exception.includes(currentRouteName)) return <></>;

  return (
    <View style={styles.nav}>
      {NAV_ITEMS.map(({key, path, label, Icon}) => {
        const isActive = currentRouteName === path;
        return (
          <TouchableOpacity
            key={key}
            style={styles.navItem}
            onPress={() => {
              navigation.navigate(path as keyof RootStackParamList);
              // navigation.dispatch(StackActions.replace(path));
            }}
            activeOpacity={0.7}>
            <Icon size={24} color={isActive ? '#964F66' : '#333'} />
            <Text
              style={[styles.navText, {color: isActive ? '#964F66' : '#333'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: 88,
    borderTopWidth: 1,
    borderTopColor: '#d9dbdb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // 배경색 설정
    elevation: 5, // Android 그림자
  },
  navItem: {
    alignItems: 'center',
    width: '20%',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4, // 아이콘과 텍스트 간 간격
  },
});

export default NavigationBar;
