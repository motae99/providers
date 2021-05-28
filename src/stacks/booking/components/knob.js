import React from 'react';
import {View, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
// get Svg shape
const knob = () => {
  return (
    <View
      style={{
        // backgroundColor: 'rgba(212, 234, 250, 1)',
        // backgroundColor: '#000',
        height: 150,
        width,
        flexDirection: 'row',
        // backgroundColor: 'white',
      }}>
      <View style={{flex: 1, backgroundColor: 'green'}} />
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
          borderRadius: 100,
          overflow: 'hidden',
          transform: [{translateY: -120}],
          // zIndex: 100,
        }}
      />
      <View style={{flex: 1, backgroundColor: 'green'}} />
    </View>
  );
};
export default knob;
