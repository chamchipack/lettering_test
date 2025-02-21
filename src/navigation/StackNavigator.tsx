// navigation/StackNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/SearchScreen';
import LocationScreen from '../screen/LocationScreen';
import OrderListScreen from '../screen/OrderListScreen';
import MyPageScreen from '../screen/MyPageScreen';
import CreateReviewScreen from '../screen/CreateReviewScreen';
import NotificationScreen from '../screen/NotificationScreen';
import OrderScreen from '../screen/OrderScreen';
import ReviewScreen from '../screen/ReviewScreen';
import OrderDetailScreen from '../screen/OrderDetailScreen';
import ProfileScreen from '../screen/ProfileScreen';
import StoreListScreen from '../screen/StoreListScreen';
import StoreDetailScreen from '../screen/StoreDetailScreen';
import InterestScreen from '../screen/InterestScreen';
import MyReviewScreen from '../screen/MyReviewScreen';
import PolicyScreen from '../screen/PolicyScreen';
import AddressListScreen from '../screen/AddressListScreen';
import AddressSearchScreen from '../screen/AddressSearchScreen';

const Stack = createNativeStackNavigator();

/**
 * @description 네비게이션 관리 컴포넌트
 *
 * Home - 메인 화면
 * StoreList - 상점 리스트 화면
 * StoreDetail - 상점 상세 화면
 * ProductDetail - 상품 세부 설정 화면
 * Payment - 결제 화면
 * Map - 지도 화면
 * Profile - 마이페이지 화면
 * PaymentHistory - 결제 내역 화면
 * Upload - 업로드 화면
 */
export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="mypage" component={MyPageScreen} />
      <Stack.Screen name="policy" component={PolicyScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="mypage/interest" component={InterestScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="store-list" component={StoreListScreen} />
      <Stack.Screen name="store-detail" component={StoreDetailScreen} />
      <Stack.Screen name="location" component={LocationScreen} />
      <Stack.Screen name="order-list" component={OrderListScreen} />
      <Stack.Screen name="order-detail" component={OrderDetailScreen} />
      <Stack.Screen name="order" component={OrderScreen} />
      <Stack.Screen name="create-review" component={CreateReviewScreen} />
      <Stack.Screen name="review" component={ReviewScreen} />
      <Stack.Screen name="review/individual" component={MyReviewScreen} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="address" component={AddressListScreen} />
      <Stack.Screen name="address/search" component={AddressSearchScreen} />
    </Stack.Navigator>
  );
}
