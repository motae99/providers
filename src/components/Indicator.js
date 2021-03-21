/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated} from 'react-native';
const Indicator = ({scrollx, files, containerWidth}) => {
  return files.map((_, i) => {
    const inputRange = [
      (i - 1) * containerWidth,
      i * containerWidth,
      (i + 1) * containerWidth,
    ];
    const opacity = scrollx.interpolate({
      inputRange,
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });

    const color = scrollx.interpolate({
      inputRange,
      outputRange: ['rgba(0, 0, 0, 0)', '#fff', 'rgba(0, 0, 0, 0)'],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        key={`indicator-${i}`}
        style={{
          height: 6,
          width: 6,
          borderRadius: 3,
          backgroundColor: color,
          opacity,
          margin: 2,
          borderWidth: 0.8,
          borderColor: '#fff',
          borderColorOpacity: opacity,
          // transform: [{scale}],
        }}
      />
    );
  });
};
export default Indicator;
