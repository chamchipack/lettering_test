import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {ChevronLeft, X} from 'lucide-react-native';

export default function CustomHeader() {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      {/* 왼쪽 아이콘 */}
      <TouchableOpacity style={{width: 40}}>
        <ChevronLeft size={30} color="gray" />
      </TouchableOpacity>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="검색"
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={setInputValue}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={() => setInputValue('')}>
            <X size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    height: 45,
    backgroundColor: '#E9EAEC',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 10, // 왼쪽 아이콘과 여백
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
});
