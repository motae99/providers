/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
const SPACING = 10;
const DURATION = 400;
const DELAY = 400;
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const {width, height} = Dimensions.get('window');
const beautyList = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <View style={{flex: 1}}>
      <SharedElement
        id={`item.${item.key}.image`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={{uri: item.poster}}
          style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
        />
      </SharedElement>
      <Animatable.View
        animation="fadeIn"
        duration={DURATION * 1.5}
        delay={DELAY}
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'rgba(0,0,0,.3)'},
        ]}
      />
      <AntDesign
        name="close"
        size={28}
        color={'#333'}
        style={{
          padding: SPACING,
          top: SPACING,
          right: SPACING,
          position: 'absolute',
          zIndex: 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{translateY: height}],
          },
        ]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: '#fff',
              transform: [{translateY: -height * 0.3}],
              padding: SPACING * 2,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          ]}>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 200}
            style={{fontWeight: '900', fontSize: 28}}>
            {item.title}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 350}
            style={{fontWeight: '500', fontSize: 16}}>
            {item.location}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 500}
            style={{fontSize: 12}}>
            {item.date}
          </Animatable.Text>
        </View>
      </SharedElement>
    </View>
  );
};
beautyList.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};
export default beautyList;
