/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import Icon from 'react-native-vector-icons/AntDesign';
import GButton from 'components/buttons/primaryButton';
const {width, height} = Dimensions.get('window');
const cardHeight = height * 0.2;
const cardWidth = width * 0.8;
export default () => {
  return (
    <View
      style={{
        height: cardHeight,
        width: cardWidth,
        borderRadius: Sizing.x10,
        marginHorizontal: 10,
        marginVertical: 10,
      }}>
      <Image
        source={require('img/makeup.jpeg')}
        style={{
          height: cardHeight,
          width: cardWidth,
          borderRadius: Sizing.x10,
        }}
      />
    </View>
  );
};
