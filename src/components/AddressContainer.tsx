import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Search, MapPin, Check} from 'lucide-react-native';

export default function AddressContainer() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  // ✅ 주소 리스트 데이터
  const addressList = [
    {id: '1', name: '위치 애칭 1', address: '경기도 성남시 수정구'},
    {id: '2', name: '위치 애칭 2', address: '서울특별시 강남구'},
    {id: '3', name: '위치 애칭 3', address: '부산광역시 해운대구'},
  ];

  return (
    <View style={styles.container}>
      {/* ✅ 1. 검색 입력 박스 */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="검색어를 입력하세요" />
        <Search size={24} color="gray" />
      </View>

      {/* ✅ 2. 현재 위치 버튼 */}
      <TouchableOpacity style={styles.currentLocationButton}>
        <Text style={styles.currentLocationText}>현재 위치로 찾기</Text>
      </TouchableOpacity>

      {/* ✅ 3. 주소 리스트 */}
      <FlatList
        data={addressList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.addressItem}
            onPress={() => setSelectedAddress(item.id)}>
            <MapPin size={24} color="gray" style={styles.icon} />
            <View style={styles.addressTextContainer}>
              <Text style={styles.nickname}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
            {selectedAddress === item.id && <Check size={24} color="green" />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
  },
  // ✅ 검색 입력 박스
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  // ✅ 현재 위치 버튼
  currentLocationButton: {
    marginTop: 12,
    backgroundColor: '#eee',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#333',
  },
  // ✅ 주소 리스트 아이템
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 8,
  },
  addressTextContainer: {
    flex: 1,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
});
