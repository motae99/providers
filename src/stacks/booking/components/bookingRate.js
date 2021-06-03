import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import SecondaryButton from 'components/buttons/secondaryButton';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Sizing.x20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  rate: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: Sizing.x20,
  },
  rateText: {
    ...Typography.header.x40,
    color: Colors.neutral.white,
  },
  review: {
    padding: Sizing.x5,
    // marginHorizontal: Sizing.x20,
  },
  reviewText: {
    ...Typography.header.x20,
    color: Colors.neutral.s400,
    paddingHorizontal: Sizing.x20,
    marginRight: Sizing.x20,
  },
});
const BookingRate = ({item}) => {
  return (
    <View style={styles.container}>
      <SecondaryButton linearstyle={styles.rate}>
        <Text style={styles.rateText}>{item.rate}</Text>
      </SecondaryButton>
      {item.review ? (
        <View style={styles.review}>
          <Text numberOfLines={3} style={styles.reviewText}>
            {item.review}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default BookingRate;
