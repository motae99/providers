import React from 'react';
import LocationView from 'react-native-location-view';
import {View} from 'react-native';

export default function SelectLocationScreen({notifyChange, closeModal}) {
  return (
    <View style={{flex: 1}}>
      <LocationView
        // AIzaSyDyFvsbn8_16j33qqKcYRyYSkQb71OlkJ4 // Hatim key
        // AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c // My Key
        apiKey={'AIzaSyDyFvsbn8_16j33qqKcYRyYSkQb71OlkJ4'}
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
