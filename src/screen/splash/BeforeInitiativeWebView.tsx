import * as React from 'react';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BeforeInitiativeWebViewProps = {
  onWebViewFinished: () => void;
};

const keys = [
  'nickname',
  'address',
  'longitude',
  'latitude',
  'userId',
  'profile_image',
  'location_list',
];

export default function BeforeInitiativeWebView({
  onWebViewFinished,
}: BeforeInitiativeWebViewProps) {
  const webViewRef = React.useRef<WebView>(null);

  const checkAsyncStorage = async () => {
    try {
      if (webViewRef.current) {
        const results = await AsyncStorage.multiGet(keys);

        const parsedData = results.reduce((acc: any, [key, value]) => {
          acc[key] = value ?? null;
          return acc;
        }, {});
        // console.log(parsedData);
        webViewRef.current?.postMessage(JSON.stringify(parsedData));
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
  };

  console.log('????');

  return (
    <WebView
      ref={webViewRef}
      cacheEnabled={true}
      source={{uri: `http://192.168.0.123:9500/splash`}}
      onLoadEnd={checkAsyncStorage}
      onError={e => console.error('WebView error:', e)}
      onLoad={() => {
        onWebViewFinished();
      }} // 로딩 완료 시 콜백 실행
    />
  );
}
