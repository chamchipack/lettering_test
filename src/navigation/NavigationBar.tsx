// import {
//   NavigationContainerRef,
//   StackActions,
//   useNavigation,
// } from '@react-navigation/native';
// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import {Home, Search, MapPin, ClipboardList, User} from 'lucide-react-native';
// import {RootStackParamList} from './module/type';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// const NAV_ITEMS = [
//   {label: '메인', key: 'Home', path: 'home', Icon: Home},
//   {label: '검색', key: 'Search', path: 'search', Icon: Search},
//   {label: '주변', key: 'Location', path: 'location', Icon: MapPin},
//   {
//     label: '주문내역',
//     key: 'OrderList',
//     path: 'order-list',
//     Icon: ClipboardList,
//   },
//   {label: '마이', key: 'MyPage', path: 'mypage', Icon: User},
//   // {label: '결제', key: 'Payments', path: 'payments', Icon: User},
// ];

// export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const exception = NAV_ITEMS.map(({path = ''}) => path);

// const NavigationBar = ({
//   navigationRef,
// }: {
//   navigationRef: NavigationContainerRef<any>;
// }) => {
//   const navigation = useNavigation<NavigationProp>();

//   const [currentRouteName, setCurrentRouteName] = useState('');

//   // ✅ 라우팅 처리
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('state', () => {
//       if (navigationRef?.getCurrentRoute) {
//         setCurrentRouteName(navigationRef.getCurrentRoute()?.name ?? '');
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   if (!exception.includes(currentRouteName)) return <></>;

//   return (
//     <View style={styles.nav}>
//       {NAV_ITEMS.map(({key, path, label, Icon}) => {
//         const isActive = currentRouteName === path;
//         return (
//           <TouchableOpacity
//             key={key}
//             style={styles.navItem}
//             onPress={() => {
//               navigation.navigate(path as keyof RootStackParamList);
//               // navigation.dispatch(StackActions.replace(path));
//             }}
//             activeOpacity={0.7}>
//             <Icon size={24} color={isActive ? '#964F66' : '#333'} />
//             <Text
//               style={[styles.navText, {color: isActive ? '#964F66' : '#333'}]}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   nav: {
//     height: 88,
//     borderTopWidth: 1,
//     borderTopColor: '#d9dbdb',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff', // 배경색 설정
//     elevation: 5, // Android 그림자
//   },
//   navItem: {
//     alignItems: 'center',
//     width: '20%',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#333',
//     marginTop: 4, // 아이콘과 텍스트 간 간격
//   },
// });

// export default NavigationBar;

import {StackActions, useNavigation} from '@react-navigation/native';
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
];

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const exception = NAV_ITEMS.map(({path}) => path);

const NavigationBar = () => {
  const navigation = useNavigation<NavigationProp>(); // ✅ useNavigation() 사용
  const [currentRouteName, setCurrentRouteName] = useState('');

  // ✅ 현재 라우트 상태 감지
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const route = navigation.getState()?.routes?.slice(-1)[0]?.name || '';
      setCurrentRouteName(route);
    });

    return unsubscribe;
  }, [navigation]);

  // ✅ 현재 화면이 NAV_ITEMS에 포함되지 않으면 네비게이션 바 숨김
  if (!exception.includes(currentRouteName)) return null;

  return (
    <View style={styles.nav}>
      {NAV_ITEMS.map(({key, path, label, Icon}) => {
        const isActive = currentRouteName === path;
        return (
          <TouchableOpacity
            key={key}
            style={styles.navItem}
            onPress={() =>
              navigation.navigate(path as keyof RootStackParamList)
            }
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
    backgroundColor: '#fff',
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    width: '20%',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default NavigationBar;
