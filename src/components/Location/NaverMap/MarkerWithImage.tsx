import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';

const MarkerWithImage = ({
  latitude = 0,
  longitude = 0,
  text = '',
  onTap = (name: string) => {},
}) => {
  if (!latitude || !longitude) return null;

  return (
    <>
      <NaverMapMarkerOverlay
        width={40}
        height={40}
        latitude={latitude}
        longitude={longitude}
        onTap={() => onTap(text)}
        anchor={{x: 0.5, y: 0.5}}
        image={require('../../../image/cake_nonebackground.png')}></NaverMapMarkerOverlay>
    </>
  );
};

export default MarkerWithImage;
