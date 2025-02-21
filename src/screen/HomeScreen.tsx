// import React, {useCallback, useEffect, useRef} from 'react';
// import {StyleSheet, View} from 'react-native';
// import WebView from 'react-native-webview';
// import {useWebViewMessage} from 'react-native-react-bridge';
// import useMessageHandler from './webview/useMessageHandler';

// export default function HomeScreen() {
//   const webViewRef = useRef<WebView>(null);
//   const {messageConverter} = useMessageHandler();
//   const {onMessage} = useWebViewMessage(message => {
//     console.log(message);
//     messageConverter(message);
//   });

//   return (
//     <View style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         cacheEnabled={true}
//         source={{uri: `http://192.168.0.11:9500/application/home`}}
//         onMessage={onMessage}
//         onLoadEnd={e => {
//           const checkAsyncStorage = async () => {
//             try {
//               if (webViewRef.current) {
//                 // 저장된 데이터가 있으면 웹뷰로 메시지 전송
//                 setTimeout(() => {
//                   console.log('wss'); //
//                   webViewRef.current?.postMessage('hideModal');
//                 }, 1000);
//               }
//             } catch (error) {
//               console.error('Error retrieving data from AsyncStorage', error);
//             }
//           };

//           checkAsyncStorage();
//         }}
//         onError={e => {
//           console.log(e);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
// });

import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import TestWebViewComponent from './webview/CustomWebViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const checkAsyncStorage = async () => {
    try {
      if (webViewRef.current) {
        const nickname = await AsyncStorage.getItem('nickname');
        webViewRef.current?.postMessage(nickname || 'Guest');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
  };

  useEffect(() => {
    const all = async () => {
      const s = await AsyncStorage.getItem('longitude');
      const d = await AsyncStorage.getItem('latitude');
      const f = await AsyncStorage.getItem('address');
    };
  }, []);

  return (
    <View style={styles.container}>
      <TestWebViewComponent
        ref={webViewRef}
        uri="home"
        onLoadActive={checkAsyncStorage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
