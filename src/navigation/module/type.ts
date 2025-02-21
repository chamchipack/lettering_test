import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Location: undefined;
  OrderList: undefined;
  MyPage: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
