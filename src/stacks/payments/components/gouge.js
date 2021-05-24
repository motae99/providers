import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {Colors} from 'styles';

const Indicator = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.primary.s600,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 20,
        height: 130,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignSelf: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
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
      </View>
      <View style={{flex: 1}}>
        <Progress.Circle
          style={{margin: 10}}
          // progress={this.state.progress}
          // indeterminate={this.state.indeterminate}
          direction="counter-clockwise"
        />
      </View>
    </View>
  );
};
export default Indicator;
