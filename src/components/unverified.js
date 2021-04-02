/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default () => {
  return (
    <SafeAreaView style={{backgroundColor: '#A5F1FA', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>waiting for verifcations</Text>
      </View>
    </SafeAreaView>
  );
};
