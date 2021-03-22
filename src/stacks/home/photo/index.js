/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, StatusBar, ScrollView} from 'react-native';

import PhotoCard from 'photo/photoCard';
const PhotoList = ({navigation, route}) => {
  return (
    <View style={{backgroundColor: '#fd34', flex: 1}}>
      <StatusBar
        // translucent
        barStyle={'light-content'}
        // backgroundColor="transparent"
      />
      <View
        style={{
          marginTop: 80,
        }}
      />

      <ScrollView showsHorizontalScrollIndicator={false}>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </ScrollView>
    </View>
  );
};

export default PhotoList;
