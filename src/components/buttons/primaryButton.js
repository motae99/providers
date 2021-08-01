import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'styles';

const Button = props => {
  const ripple = TouchableNativeFeedback.Ripple(Colors.primary.s200, false);
  return (
    <TouchableOpacity
      background={ripple}
      style={props.containerStyle}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <LinearGradient
        colors={[Colors.primary.brand, Colors.primary.s200]}
        style={props.linearstyle}>
        {props.children}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default Button;
