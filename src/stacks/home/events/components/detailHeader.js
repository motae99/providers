/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Animated, StyleSheet, Text} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from 'react-navigation-hooks';
import * as Animatable from 'react-native-animatable';
import {width, height, HEADER_IMAGE_HEIGHT, MIN_HEADER_HEIGHT} from '../detail';

const ICON_SIZE = 20;
const PADDING = 18;

const Header = ({navigation, route, animatedValue, name, list}) => {
  const opacity = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT, HEADER_IMAGE_HEIGHT + 40],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-28, PADDING],
    extrapolate: 'clamp',
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT - 36, -4],
    extrapolate: 'clamp',
  });

  const fadeIn = {
    0: {
      opacity: 0,
      translateY: 100,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: MIN_HEADER_HEIGHT,
          alignItems: 'flex-end',
          paddingHorizontal: 18,
          paddingBottom: MIN_HEADER_HEIGHT / 5,
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
            backgroundColor: 'white',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            list.current.scrollToIndex({
              animated: true,
              index: 0,
            });
            setTimeout(() => {
              navigation.goBack();
            }, 100);
          }}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="arrow-back" size={20} color="#2B3449" />
          </View>
        </TouchableOpacity>

        <Animated.View
          style={{flex: 1, transform: [{translateX}, {translateY}]}}>
          <Animatable.View
            animation={fadeIn}
            delay={300}
            duration={400}
            useNativeDriver={true}>
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                fontWeight: '800',
              }}>
              {name}
            </Text>
          </Animatable.View>
        </Animated.View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <Ionicons name="heart" size={20} color="#2B3449" />
          </View>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Fontisto name="share-a" size={18} color="#2B3449" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
