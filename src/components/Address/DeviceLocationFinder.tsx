import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      try {
        const status = await Geolocation.requestAuthorization('whenInUse'); // 기본적으로 실행 중 권한 요청

        if (status === 'granted') {
          // ⚠️ iOS는 'always'를 바로 요청할 수 없고, 사용자가 수동으로 설정해야 함.
          console.log('iOS 위치 권한 허용됨 (whenInUse)');
          return status;
        } else {
          console.log('iOS 위치 권한 거부됨');
          return 'denied';
        }
      } catch (error) {
        console.error('위치 권한 요청 중 오류 발생:', error);
        return 'error';
      }
    } else if (Platform.OS === 'android') {
      // Android에서는 권한 요청이 필요
      try {
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return 'granted';
        } else {
          console.log('Location permission denied');
          return 'denied';
        }
      } catch (err) {
        console.warn(err);
        return 'error';
      }
    }
  } catch (e) {
    console.error('Permission request error:', e);
    return 'error';
  }
}

export default function DeviceLocationFinder() {
  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        try {
          const result = await requestPermission();
          if (result === 'granted' && Platform.OS === 'ios') {
            try {
              Geolocation.getCurrentPosition(
                pos => {
                  const {latitude, longitude, accuracy, altitude} = pos.coords;
                  console.log({latitude, longitude, accuracy, altitude});
                },
                error => {
                  console.error('Geolocation error:', error);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 15000,
                  maximumAge: 10000,
                },
              );
            } catch (e) {
              console.log(e);
            }
          } else {
            console.warn('Location permission not granted');
          }
        } catch (e) {
          console.error('Error fetching location:', e);
        }
      };

      fetchLocation();
    }, []),
  );

  return null;
}
