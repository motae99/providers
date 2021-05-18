import React from 'react';
import LocationView from 'react-native-location-view';
import {View} from 'react-native';

export default function SelectLocationScreen({notifyChange, closeModal}) {
  return (
    <View style={{flex: 1}}>
      <LocationView
        apiKey={'AIzaSyBQ5DOX3d0Ol6oKj0FSCL29PXnmDLVuaBg'}
        initialLocation={{
          latitude: 15.570526415687535,
          longitude: 32.546177983344954,
        }}
        onLocationSelect={address => {
          console.log(address);
          notifyChange(address);
          closeModal();
        }}
        actionText="pick"
        actionButtonStyle={{backgroundColor: 'blue'}}
        markerColor="blue"
      />
    </View>
  );
}
