import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
type Form = {
  width: number;
  height?: number;
};
const ZoomedMarkerNoneClicked = ({
  latitude = 0,
  longitude = 0,
  text = '',
  onTap = (name: string) => {},
  selectedName = '',
}) => {
  const textLength = text.length || 5;
  const form: Form = {
    width: textLength * 20,
  };

  if (Platform.OS === 'android') form['height'] = 50;

  if (!latitude || !longitude) return null;
  return (
    <NaverMapMarkerOverlay
      latitude={latitude}
      longitude={longitude}
      isForceShowIcon={true}
      {...form}
      zIndex={240000}
      globalZIndex={240000}
      isHideCollidedMarkers={true}
      isHideCollidedSymbols={true}
      onTap={() => onTap(text)}
      image={{symbol: 'red'}}
      anchor={{x: 0.2, y: 1}}>
      <View
        key={`${text}/${textLength}/${0}`}
        collapsable={false}
        style={{
          flexDirection: 'row', // 가로 정렬
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          // shadowColor: '#000',
          // shadowOffset: {width: 0, height: 1},
          // shadowOpacity: 0.3,
          // shadowRadius: 2,
          width: textLength * 20,
        }}>
        <View style={{}}>
          <View
            style={{
              height: 35,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: '#CECECE',
              borderRadius: 30,
            }}>
            <Text style={styles.markerText}>{text}</Text>
          </View>

          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderTopWidth: 10,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: '#CECECE', // 삼각형 색상
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

export default ZoomedMarkerNoneClicked;
