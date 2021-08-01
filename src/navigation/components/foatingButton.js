/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Button = props => {
  return (
    <LinearGradient
      colors={['#55DAEA', '#ffff']}
      style={{
        width: 55,
        height: 55,
        borderRadius: 30,
        marginLeft: 4,
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#55DAEA'.primary.brand,
        shadowOpacity: 1,
        elevation: 8,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 13},
      }}>
      {props.childern}
    </LinearGradient>
  );
};
export default Button;
