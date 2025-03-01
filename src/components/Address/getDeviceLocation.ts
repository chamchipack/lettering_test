import Geo from '@react-native-community/geolocation';
import {Platform, PermissionsAndroid} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return true;
      // if (status === 'granted') {
      //   console.log('iOS 위치 권한 허용됨 (whenInUse)');
      //   return true;
      // } else {
      //   console.log('iOS 위치 권한 거부됨');
      //   return false;
      // }
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
  status: boolean;
} | null> {
  const hasPermission = await requestPermission();
  console.log(hasPermission);
  if (!hasPermission) {
    return {latitude: 0, longitude: 0, status: false};
  }

  return new Promise((resolve, reject) => {
    Geo.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        resolve({latitude, longitude, status: true});
      },
      error => {
        reject({latitude: 0, longitude: 0, status: false});
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
}
