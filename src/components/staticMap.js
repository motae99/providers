import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const region = {
  latitude: 17.441549,
  longitude: 78.489381,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const Map = (item) => {
  return (
    <MapView
      style={{
        flex: 1,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      initialRegion={region}>
      <Marker
        title={item.name}
        description={item.address}
        coordinate={{
          latitude: item.coordinate.latitude,
          longitude: item.coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </MapView>
  );
};
export default Map;
