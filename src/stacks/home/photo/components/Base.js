import React from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cardWidth, cardHeigh} from './FoldingStyle';

const {interpolate, Extrapolate} = Animated;

const Base = ({toggle, animation}) => {
  const baseHieght = interpolate(animation, {
    inputRange: [0, 0.3, 0.4],
    outputRange: [cardHeigh, cardHeigh + 12, cardHeigh],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [20, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <TouchableWithoutFeedback onPress={() => toggle()}>
      <Animated.Image
        style={{
          width: cardWidth,
          height: baseHieght,
          alignSelf: 'center',
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        resizeMode="cover"
        source={require('img/photography.jpeg')}
      />
      <Text
        style={{color: 'white', position: 'absolute', bottom: 20, left: 20}}>
        5 people have sent a request
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Base;
