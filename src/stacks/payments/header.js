import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText, Vector, round} from 'react-native-redash';
import {Colors, Sizing, Typography} from 'styles';

import {graphs, SIZE, GraphIndex} from './model';

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  values: {
    marginTop: Sizing.x10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'rgba(89, 18, 130, 0.3)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
  },
  value: {
    ...Typography.header.x30,
    color: Colors.secondary.brand,
  },
  label: {
    ...Typography.header.x30,
    color: Colors.secondary.brand,
  },
});

const Header = ({translation, index}) => {
  const data = useDerivedValue(() => graphs[index.value].data);
  const price = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [data.value.maxPrice, data.value.minPrice],
    );
    return `$ ${round(p, 2).toLocaleString('en-US', {currency: 'USD'})}`;
  });
  const percentChange = useDerivedValue(
    () => `${round(data.value.percentChange, 3)}%`,
  );
  const label = useDerivedValue(() => data.value.label);
  const style = useAnimatedStyle(() => ({
    // fontWeight: '100',
    fontSize: 16,
    lineHeight: 16,
    color:
      data.value.percentChange > 0
        ? Colors.primary.s600
        : Colors.secondary.s600,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <View>
          <ReText style={styles.value} text={price} />
          <ReText style={styles.label} text={label} />
        </View>
        <View>
          <ReText style={style} text={percentChange} />
          {/* <ReText
            style={[styles.label, {height: 40, alignSelf: 'center'}]}
            text={label}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default Header;
