import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useVector, snapPoint} from 'react-native-redash';
import {SharedElement} from 'react-navigation-shared-element';
// import { Video } from "expo-av";

import {SnapchatRoutes} from './Model';

// interface StoryProps {
//   navigation: NavigationProp<SnapchatRoutes, "Story">;
//   route: RouteProp<SnapchatRoutes, "Story">;
// }

const {height} = Dimensions.get('window');
// const AnimatedVideo = Animated.createAnimatedComponent(Video);

const Story = ({route, navigation}) => {
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const {item} = route.params;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({translationX, translationY}) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({translationY, velocityY}) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        runOnJS(navigation.goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      transform: [
        {translateX: translation.x.value * scale},
        {translateY: translation.y.value * scale},
        {scale},
      ],
    };
  });
  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement
          id={`sharedImage.${item.src.portrait}`}
          style={{flex: 1}}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              // resizeMode: 'cover',
            }}>
            <Animated.Image
              source={{uri: item.src.portrait}}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  // resizeMode: 'cover',
                },
                borderStyle,
              ]}
            />
          </View>
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  );
};

Story.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [{id: `sharedImage.${item.src.portrait}`}];

  // return selectedItem.files.map(
  //   (item, index) => `item.${selectedItem.key}.image.${item.uri}`,
  // );
};

export default Story;
