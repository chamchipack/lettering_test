import {StyleSheet, Text, View} from 'react-native';
import {X} from 'lucide-react-native';

interface Props {
  selectedName: string;
  setSelectedName: (name: string) => void;
}

export default function SelectionBox({
  selectedName = '',
  setSelectedName,
}: Props) {
  return (
    <>
      <View style={styles.selectedContainer}>
        {/* 좌측 이미지 */}
        <View style={styles.imageBox}></View>

        {/* 가게 정보 (이름 + 주소) */}
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{selectedName}</Text>
          <Text style={styles.storeAddress}>서울특별시 강남구 역삼동</Text>
        </View>

        {/* 우측 닫기 버튼 */}
        <X
          size={24}
          color="black"
          onPress={() => setSelectedName('')}
          style={styles.closeIcon}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center',
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd', // 임시 배경
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 14,
    color: 'gray',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
