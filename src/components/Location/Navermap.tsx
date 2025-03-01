import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import MarkerWithImage from './NaverMap/MarkerWithImage';

import DeviceLocationFinder from '../Address/DeviceLocationFinder';
import ZoomedMarkerClicked from './NaverMap/Markers/ZoomedMarkerClicked';
import ZoomedMarkerNoneClicked from './NaverMap/Markers/ZoomedMarkerNoneClicked';
import SelectionBox from './NaverMap/Selection/SelectionBox';
import {dummy, getDistanceBetween, MAX_DISTANCE_METERS} from './NaverMap/tools';

const camera = {
  latitude: 37.439811,
  longitude: 127.12798,
  zoom: 16.8, // 초기 줌 레벨
};

export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null); // 📌 지도 컨트롤을 위한 ref 추가
  const [zoom, setZoom] = useState(15);
  const [position, setPosition] = useState({
    latitude: camera.latitude,
    longitude: camera.longitude,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedName, setSelectedName] = useState<string>('');
  const [filteredMarkers, setFilteredMarkers] = useState(dummy); // ✅ 반경 내 필터링된 데이터 상태

  const prevMarkersRef = useRef(dummy);

  const cameraChangeTimeout = useRef<NodeJS.Timeout | null>(null); // ✅ 타이머 저장용 ref

  // 🔹 카메라 이동 시 실행
  const handleCameraChange = (event: any) => {
    if (cameraChangeTimeout.current) {
      clearTimeout(cameraChangeTimeout.current); // 기존 타이머 제거
    }

    cameraChangeTimeout.current = setTimeout(() => {
      setZoom(event.zoom);
      setPosition({latitude: event.latitude, longitude: event.longitude});
    }, 100);
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

    prevMarkersRef.current = filteredMarkers;

    setFilteredMarkers(nearbyMarkers); // ✅ 필터링된 마커 업데이트
    setIsLoading(false);
  };

  // 🔹 마커 선택 시 실행
  const onTapMethod = (store: any) => {
    setPosition({latitude: store.latitude, longitude: store.longitude});
    if (mapRef.current) {
      mapRef.current?.animateCameraTo({
        latitude: store.latitude,
        longitude: store.longitude,
        // zoom: zoom > 17 ? zoom : 17.1, // 클릭 시 확대
        duration: 500,
      });
    }

    setSelectedName(store._id);
  };

  return (
    <View style={{flex: 1}}>
      <DeviceLocationFinder />
      <NaverMapView
        ref={mapRef}
        isRotateGesturesEnabled={false}
        isTiltGesturesEnabled={false}
        isScrollGesturesEnabled={isLoading === true ? false : true}
        isShowZoomControls={true}
        style={{flex: 1}}
        initialCamera={camera}
        logoAlign="TopRight"
        minZoom={12}
        onCameraChanged={handleCameraChange}
        onCameraIdle={handleCameraIdle}>
        {(isLoading ? prevMarkersRef.current : filteredMarkers).map(marker =>
          zoom > 17 ? (
            <React.Fragment key={marker._id}>
              {selectedName === marker._id ? (
                <ZoomedMarkerClicked
                  key={marker._id}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  text={marker.name}
                  onTap={() => onTapMethod(marker)}
                />
              ) : (
                <ZoomedMarkerNoneClicked
                  key={marker._id}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  text={marker.name}
                  onTap={() => onTapMethod(marker)}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment key={marker._id}>
              {selectedName === marker._id ? (
                <ZoomedMarkerClicked
                  key={marker._id}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  text={marker.name}
                  onTap={() => onTapMethod(marker)}
                />
              ) : (
                <MarkerWithImage
                  key={marker._id}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  text={marker.name}
                  onTap={() => onTapMethod(marker)}
                />
              )}
            </React.Fragment>
          ),
        )}
      </NaverMapView>

      {/* 📌 선택한 마커의 이름을 하단에 표시 */}
      {selectedName && (
        <SelectionBox
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
      )}
    </View>
  );
}
