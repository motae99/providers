/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width, height, HEADER_IMAGE_HEIGHT, MIN_HEADER_HEIGHT} from '../detail';

const Header = ({navigation, route, animatedValue, list}) => {
  const {selectedItem, selectedImageIndex} = route.params;

  const [current, setCurrent] = React.useState(selectedImageIndex);
  // const list = React.useRef();
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index + 1);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const hHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const radius = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT / 2],
    outputRange: [25, 0],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT / 2, HEADER_IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        width,
        height: hHeight,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
        opacity,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
      <FlatList
        ref={list}
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={selectedImageIndex}
        data={selectedItem.files}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({item}) => {
          return (
            <View>
              <SharedElement
                id={`item.${selectedItem.key}.image.${item.key}`}
                style={{
                  width,
                  height: HEADER_IMAGE_HEIGHT,
                }}>
                <Image
                  style={{
                    width,
                    height: HEADER_IMAGE_HEIGHT,
                    resizeMode: 'cover',
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  source={item.image}
                />
              </SharedElement>
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 18,
          right: 18,
          width: 50,
          height: 24,
          backgroundColor: 'rgba(34,40,42,.7)',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>
          {current}/{selectedItem.files.length}
        </Text>
      </View>
    </Animated.View>
  );
};

Header.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return selectedItem.files.map(
    (item) => `item.${selectedItem.key}.image.${item.key}`,
  );
};
export default Header;
