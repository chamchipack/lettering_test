import {StackActions, useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../navigation/module/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebViewMessage} from 'react-native-react-bridge';
import {getDeviceLocation} from '../../components/Address/getDeviceLocation';

type Status = 'forward' | 'back' | 'replace';

type Params = {
  path: string;
  status: Status;
  params?: string;
};

export type StorageMessage = {
  type: 'STORAGE';
  data: {
    name: string;
  };
};

export default function useMessageHandler() {
  const navigation = useNavigation<NavigationProp>();

  /**
   *
   * @param params : 1개의 데이터만 스토리지에 저장할때는 { key: '키값', name: '저장할 데이터' }
   *
   * @param params : 2개 이상의 데이터를 스토리지에 저장할때는 { multiple: true, data: [] }
   * data 배열의 구조는 { key: '키값', name: '저장할 데이터'}[]
   */
  const handleStorage = async (params: WebViewMessage<any>) => {
    const {
      name = '',
      key = '',
      multiple = false,
      data = [],
    } = params?.data || {};

    try {
      if (multiple && data.length) {
        await Promise.all(
          data.map(({key: _key = '', name: _name = ''}) =>
            AsyncStorage.setItem(
              _key,
              typeof _name !== 'string' ? JSON.stringify(_name) : _name,
            ),
          ),
        );
      } else await AsyncStorage.setItem(key, name);
    } catch (e) {}
  };

  /**
   *
   * @param params 파라미터는 필요하지 않습니다.
   * @returns : { latitude: 37.123, longitude: 126.123 } 둘다 number로 리턴됩니다.
   *
   * getDeviceLocation 함수는 사용자의 권한을 획득하여 현재 디바이스의 GPS 위경도 위치를 가져옵니다.
   *
   */
  const handleFindLocation = async (params: WebViewMessage<any>) => {
    try {
      const result = await getDeviceLocation();
      return result;
      // await AsyncStorage.setItem(key, name);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   *
   * @param params status는 back | forward | replace 세가지 입니다. stack navigation의 메소드를 따릅니다.
   *
   * path는 합의된 라우팅 주소입니다.
   *
   * params는 파라미터 객체입니다.
   *
   *
   */
  const handleNavigation = (route: WebViewMessage<Params>) => {
    try {
      const {path = '', status = '', params = ''} = route.data;

      if (status === 'back') navigation.goBack();
      else if (status === 'replace')
        navigation.dispatch(StackActions.replace(path));
      else if (path) navigation.navigate(path as any, params);
    } catch (e) {
      console.error('오류:', e);
    }
  };

  const messageConverter = async (route: WebViewMessage<unknown>) => {
    try {
      if (route.type === 'STORAGE') {
        return handleStorage(route as WebViewMessage<StorageMessage>);
      } else if (route.type === 'NAVIGATE') {
        return handleNavigation(route as WebViewMessage<Params>);
      } else if (route.type === 'LOCATION') {
        return await handleFindLocation(route as WebViewMessage<any>);
      }
    } catch (error) {
      console.error('onMessage JSON 파싱 오류:', error);
    }
  };

  return {messageConverter};
}
