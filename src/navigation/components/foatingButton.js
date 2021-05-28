/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Button = props => {
  return (
    <LinearGradient
      colors={['#55DAEA', '#219CAB']}
      style={{
        width: 55,
        height: 55,
        borderRadius: 30,
        marginLeft: 4,
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.childern}
    </LinearGradient>
  );
};
export default Button;
