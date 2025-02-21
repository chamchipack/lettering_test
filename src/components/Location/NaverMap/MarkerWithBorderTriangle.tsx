import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MarkerWithBorderTriangle = ({
  latitude = 0,
  longitude = 0,
  text = '',
  onTap = (name: string) => {},
  selectedName = '',
}) => {
  const isSelected = (selectedName: string, name: string) =>
    selectedName === name;

  if (!latitude || !longitude) return null;
  return (
    <NaverMapMarkerOverlay
      key={`${latitude}-${longitude}-${selectedName}`}
      latitude={latitude}
      longitude={longitude}
      isForceShowIcon={true}
      onTap={() => onTap(text)}
      anchor={{x: 0.5, y: 0.5}}>
      <View
        style={{
          flexDirection: 'row', // 가로 정렬
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10, // 좌우 여백 추가
          // overflow: 'hidden',
          padding: 2,
          shadowColor: isSelected(selectedName, text) ? '#fff' : '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <View
            style={{
              height: 35,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              overflow: 'hidden',
              borderWidth: isSelected(selectedName, text) ? 2 : 0,
              borderColor: isSelected(selectedName, text) ? '#000' : '#fff',
              borderRadius: 30,
            }}>
            {/* <Image
              source={require('../../image/cake1.png')}
              style={{width: 24, height: 24, marginRight: 5, borderRadius: 50}}
              resizeMode="contain"
            /> */}
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
              borderTopColor: isSelected(selectedName, text) ? 'black' : '#fff', // 삼각형 색상
              marginTop: -2, // 마커와 자연스럽게 연결
              left: 10,
            }}
          />
        </View>
      </View>
    </NaverMapMarkerOverlay>
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
