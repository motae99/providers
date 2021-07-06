import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import Feather from 'react-native-vector-icons/Feather';
import {ReText, Vector, round} from 'react-native-redash';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {graphs, SIZE, GraphIndex} from '../model';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 80,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    ...Typography.header.x40,
  },
  totalAmount: {
    marginTop: 95,

    ...Typography.header.x60,
    marginBottom: 10,
  },
  amountDescription: {
    ...Typography.header.x10,
    // fontWeight: 'bold',
    // fontSize: 14,
    color: Colors.neutral.s200,
    marginBottom: 30,
  },
  amountDetails: {
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  amountButton: {
    // width: width - ,
    height: 85,
    width: width / 2 - 30,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.neutral.white,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 5,
    marginRight: 15,
    opacity: 0.5,
  },
  buttonText: {
    justifyContent: 'space-between',
    height: '100%',
  },
  buttonTitle: {
    ...Typography.header.x20,
    color: Colors.neutral.s300,
  },
  buttonAmount: {
    ...Typography.header.x30,
    color: Colors.neutral.black,
  },
});
const Income = ({translation, index}) => {
  const data = useDerivedValue(() => graphs[index.value].data);
  const price = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [data.value.maxPrice, data.value.minPrice],
    );
    return `$ ${round(p, 2).toLocaleString('en-US', {currency: 'USD'})}`;
  });
  const providerPrice = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [data.value.maxPrice, data.value.minPrice],
    );
    return `$ ${round(p, 2).toLocaleString('en-US', {currency: 'USD'})}`;
  });
  const kantaPrice = useDerivedValue(() => {
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
    fontWeight: '500',
    fontSize: 24,
    color: data.value.percentChange > 0 ? 'green' : 'red',
  }));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="bar-chart-2" size={20} color={Colors.neutral.black} />
        <Text style={styles.headerText}>Income</Text>
        <Feather name="bell" size={20} color={Colors.neutral.black} />
      </View>
      <ReText style={styles.totalAmount} text={price} />
      <Text style={styles.amountDescription}>
        kanta book 10% of Total Income
      </Text>
      <View style={styles.amountDetails}>
        <View style={styles.amountButton}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: Colors.primary.s200},
            ]}>
            <Feather
              name="arrow-down-left"
              size={16}
              color={Colors.primary.brand}
            />
          </View>
          <View style={styles.buttonText}>
            <Text style={styles.buttonTitle}>Total Income</Text>
            {/* <Text style={styles.buttonAmount}>$2,700</Text> */}
            <ReText style={styles.buttonAmount} text={price} />
          </View>
        </View>
        <View style={styles.amountButton}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: Colors.secondary.s200},
            ]}>
            <Feather
              name="arrow-up-right"
              size={16}
              color={Colors.secondary.brand}
            />
          </View>
          <View style={styles.buttonText}>
            <Text style={styles.buttonTitle}>Kanta Book</Text>
            <ReText style={styles.buttonAmount} text={percentChange} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Income;
