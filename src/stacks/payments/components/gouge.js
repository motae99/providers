import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Donut from 'components/dount';
import {Colors} from 'styles';

const Indicator = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.neutral.white,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 20,
        height: 160,
        // width: 300,
        // paddingVertical: 20,
        // paddingHorizontal: 30,
        // alignSelf: 'center',
        // flexDirection: 'row',
      }}>
      {/* <Donut
        key={1}
        percentage={240}
        radius={50}
        color={'skyblue'}
        delay={500000}
        max={500}
      /> */}
    </View>
  );
};
export default Indicator;
