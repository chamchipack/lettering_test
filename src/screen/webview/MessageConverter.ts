// import {WebViewMessageEvent} from 'react-native-webview';
// import {StackActions, useNavigation} from '@react-navigation/native';
// import {NavigationProp} from '../../navigation/module/type';

// const navigation = useNavigation<NavigationProp>();

// export const messageConverter = (e: WebViewMessageEvent) => {
//   try {
//     const route = JSON.parse(e.nativeEvent.data);

//     if (route.type === 'STORAGE') return handleStorage(route);
//     else if (route.type === 'NAVIGATION') return handleNavigation(route);
//     else return;
//   } catch (error) {
//     console.error('onMessage JSON 파싱 오류:', error);
//   }
// };

// export type StorageMessage = {
//   type: 'STORAGE';
//   data: string;
// };
// const handleStorage = (params: StorageMessage) => {};

// type Status = 'forward' | 'back' | 'replace';

// type Params = {
//   path: string;
//   status: Status;
//   params?: string;
// };
// const handleNavigation = (parameter: Params) => {
//   try {
//     const {path = '', status = '', params = ''} = parameter;

//     if (status === 'back') navigation.goBack();
//     else if (status === 'replace')
//       navigation.dispatch(StackActions.replace(path));
//     else if (path) navigation.navigate(path as any, params);
//     return;
//   } catch (e) {
//     console.error('오류:', e);
//   }
// };
