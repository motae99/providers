import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {Colors} from 'styles';

const Indicator = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.secondary.s600,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        height: 130,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignSelf: 'center',
      }}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>Payments</Text>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
          65%
        </Text>
        <Text
          style={{color: 'white', paddingHorizontal: 20, fontWeight: 'bold'}}>
          Total Paid
        </Text>
      </View>
      <View style={{paddingTop: 10, width: '100%'}}>
        <Progress.Bar
          progress={0.65}
          color="white"
          borderWidth={0}
          unfilledColor="rgba(255, 255, 255, .3)"
          width={300}
        />
      </View>
    </View>
  );
};
export default Indicator;
