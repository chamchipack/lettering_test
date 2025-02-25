import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ZoomedMarkerClicked = ({
  latitude = 0,
  longitude = 0,
  text = '',
  onTap = () => {},
  selectedName = '',
}) => {
  const textLength = text.length || 5;

  if (!latitude || !longitude) return null;

  if (!text) return null;

  return (
    <NaverMapMarkerOverlay
      latitude={latitude}
      longitude={longitude}
      isForceShowIcon={true}
      zIndex={250000}
      globalZIndex={250000}
      onTap={onTap}
      anchor={{x: 0.5, y: 0.5}}>
      <View
        key={`${text}/${textLength}/${0}`}
        collapsable={false}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: textLength * 20,
        }}>
        <View>
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
              borderColor: '#000',
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
              borderTopColor: 'black', // 삼각형 색상
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

export default ZoomedMarkerClicked;
