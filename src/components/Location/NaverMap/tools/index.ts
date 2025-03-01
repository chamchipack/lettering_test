const EARTH_RADIUS_KM = 6371; // 지구 반지름 (km)
export const MAX_DISTANCE_METERS = 500; // ✅ 반경 500m 내 데이터만 표시

export const getDistanceBetween = (
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

export const dummy = [
  {
    _id: 'id1',
    name: '세븐일레븐',
    longitude: 127.128146,
    latitude: 37.440048249,
  },
  {_id: 'id2', name: 'GS25', longitude: 127.1272, latitude: 37.4401},
  {_id: 'id3', name: '배스킨라빈스', longitude: 127.12852, latitude: 37.44016},
  {_id: 'id4', name: '핑크네일', longitude: 127.12802, latitude: 37.44053},
  {_id: 'id5', name: '잠실역', longitude: 127.102387, latitude: 37.513442},
];
