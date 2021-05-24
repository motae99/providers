import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Backdrop = ({open}) => {
  const animatedProps = useAnimatedProps(() => ({
    pointerEvents: open.value < 1 ? 'none' : 'box-none',
  }));
  const style = useAnimatedStyle(() => ({
    backgroundColor: 'grey',
    opacity: 0.6 * open.value,
  }));
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, style]}
      animatedProps={animatedProps}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => (open.value = withTiming(0))}
      />
    </Animated.View>
  );
};

export default Backdrop;
