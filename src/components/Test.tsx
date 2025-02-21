import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MarkerWithBorderTriangle = ({text = ''}) => {
  return (
    <View
      style={{
        // width: 200, // 이미지 포함하도록 너비 조정
        // height: 70,
        flexDirection: 'row', // 가로 정렬
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 좌우 여백 추가
        overflow: 'hidden',
        padding: 2,
      }}>
      <View style={{alignItems: 'flex-start'}}>
        {/* 마커 */}
        <View
          style={{
            height: 35,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 30,
          }}>
          <Image
            source={require('../image/cake1.png')}
            style={{width: 24, height: 24, marginRight: 5, borderRadius: 50}}
            resizeMode="contain"
          />
          <Text style={styles.markerText}>{text}</Text>
        </View>

        {/* 삼각형 (꼭짓점) */}
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderTopWidth: 10,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: 'black', // 삼각형 색상
            marginTop: -2, // 마커와 자연스럽게 연결
            left: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerText: {
    fontSize: 14,
    color: 'black',
  },
});

export default MarkerWithBorderTriangle;

{
  /* <View
        style={{
          backgroundColor: 'white',
          width: 150, // 이미지 포함하도록 너비 조정
          height: 50,
          flexDirection: 'row', // 가로 정렬
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10, // 좌우 여백 추가
          overflow: 'hidden',
          borderBottomWidth: 2,
          borderBottomColor: 'black',
          borderTopWidth: 2,
          borderTopColor: 'black',
          borderRightWidth: 2,
          borderRightColor: 'black',
          borderLeftWidth: 2,
          borderLeftColor: 'black',
          borderRadius: 30,
        }}>
        <Image
          source={require('../image/cake1.png')}
          style={{width: 24, height: 24, marginRight: 5}} // 크기 및 여백 조정
          resizeMode="contain"
        />

        <Text style={styles.markerText}>{text}</Text>
      </View> */
}
