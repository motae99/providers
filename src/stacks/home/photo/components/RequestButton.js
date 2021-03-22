import React from 'react';
import {View, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {sWidth, sHeight} from './FoldingStyle';

const Second = ({toggle, animation}) => {
  return (
    <View style={{width: sWidth, height: sHeight, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: sHeight / 2,
            width: sWidth * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01c5c4',
            borderRadius: 20
          }}
          onPress={() => toggle()}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>REQUEST</Text>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

export default Second;
