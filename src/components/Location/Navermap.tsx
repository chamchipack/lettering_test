import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import MarkerWithImage from './NaverMap/MarkerWithImage';
import MarkerWithBorderTriangle from './NaverMap/MarkerWithBorderTriangle';

import {X} from 'lucide-react-native';
import DeviceLocationFinder from '../Address/DeviceLocationFinder';

const camera = {
  latitude: 37.439811,
  longitude: 127.12798,
  zoom: 16.8, // 초기 줌 레벨
};

const EARTH_RADIUS_KM = 6371; // 지구 반지름 (km)
const MAX_DISTANCE_METERS = 500; // ✅ 반경 500m 내 데이터만 표시

// 🔹 위도/경도를 이용한 거리 계산 함수
const getDistanceBetween = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c * 1000; // ✅ km → m 변환
};

// 🔹 더미 데이터 (편의점 위치)
const dummy = [
  {_id: 'id1', name: '세븐일레븐', longitude: 127.1282, latitude: 37.4401},
  {_id: 'id2', name: 'GS25', longitude: 127.1272, latitude: 37.4401},
  {_id: 'id3', name: '배스킨라빈스', longitude: 127.12852, latitude: 37.44016},
  {_id: 'id4', name: '핑크네일', longitude: 127.12802, latitude: 37.44053},
  {_id: 'id5', name: '잠실역', longitude: 127.102387, latitude: 37.513442},
];

export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null); // 📌 지도 컨트롤을 위한 ref 추가
  const [zoom, setZoom] = useState(15);
  const [position, setPosition] = useState({
    latitude: camera.latitude,
    longitude: camera.longitude,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<'custom' | 'image' | null>(
    null,
  );
  const [selectedName, setSelectedName] = useState<string>('');
  const [filteredMarkers, setFilteredMarkers] = useState(dummy); // ✅ 반경 내 필터링된 데이터 상태

  useEffect(() => {
    setCurrentMarker(zoom > 17 ? 'custom' : 'image');
  }, []);

  // 🔹 카메라 이동 시 실행
  const handleCameraChange = (event: any) => {
    setZoom(event.zoom);
    setPosition({latitude: event.latitude, longitude: event.longitude});
  };

  // 🔹 카메라 이동이 멈추면 실행 (필터링 로직 포함)
  const handleCameraIdle = () => {
    setIsLoading(true);

    // ✅ 500m 반경 내 데이터 필터링
    const nearbyMarkers = dummy.filter(({latitude, longitude}) => {
      const distance = getDistanceBetween(
        position.latitude,
        position.longitude,
        latitude,
        longitude,
      );
      return distance <= MAX_DISTANCE_METERS;
    });

    setFilteredMarkers(nearbyMarkers); // ✅ 필터링된 마커 업데이트

    const newMarker = zoom > 17 ? 'custom' : 'image';
    if (newMarker !== currentMarker) {
      setCurrentMarker(newMarker);
    }

    setIsLoading(false);
  };

  // 🔹 마커 선택 시 실행
  const onTapMethod = (store: any) => {
    setSelectedName(store.name); // 📌 선택한 마커의 이름 표시

    setPosition({latitude: store.latitude, longitude: store.longitude});
    if (mapRef.current) {
      mapRef.current?.animateCameraTo({
        latitude: store.latitude,
        longitude: store.longitude,
        zoom: 17.1, // 클릭 시 확대
        duration: 500,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <DeviceLocationFinder />
      <NaverMapView
        ref={mapRef} // 📌 ref 연결
        isRotateGesturesEnabled={false}
        isTiltGesturesEnabled={false}
        isScrollGesturesEnabled={!isLoading}
        style={{flex: 1}}
        initialCamera={camera}
        logoAlign="TopRight"
        minZoom={12}
        onCameraChanged={handleCameraChange}
        onCameraIdle={handleCameraIdle}>
        {/* ✅ 필터링된 데이터만 마커로 표시 */}
        {filteredMarkers.map(marker =>
          currentMarker === 'custom' || (isLoading && zoom > 17) ? (
            <MarkerWithBorderTriangle
              key={marker._id}
              latitude={marker.latitude}
              longitude={marker.longitude}
              text={marker.name}
              onTap={() => onTapMethod(marker)}
              selectedName={selectedName}
            />
          ) : (
            <MarkerWithImage
              key={marker._id}
              latitude={marker.latitude}
              longitude={marker.longitude}
              text={marker.name}
              onTap={() => onTapMethod(marker)}
            />
          ),
        )}
      </NaverMapView>

      {/* 📌 선택한 마커의 이름을 하단에 표시 */}
      {selectedName && (
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
      )}
    </View>
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
