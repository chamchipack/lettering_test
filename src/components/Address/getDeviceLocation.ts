import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        console.log('iOS 위치 권한 허용됨 (whenInUse)');
        return true;
      } else {
        console.log('iOS 위치 권한 거부됨');
        return false;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location for better functionality.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.error('권한 요청 중 오류 발생:', error);
    return false;
  }
}

export async function getDeviceLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  const hasPermission = await requestPermission();
  if (!hasPermission) {
    console.warn('위치 권한이 없습니다.');
    return null;
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('현재 위치:', {latitude, longitude});
        resolve({latitude, longitude});
      },
      error => {
        console.error('위치 가져오기 실패:', error);
        reject(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
}
