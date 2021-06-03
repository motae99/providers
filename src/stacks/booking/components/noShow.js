import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity, useBottomSheetModal} from '@gorhom/bottom-sheet';
import SecondaryButton from 'components/buttons/secondaryButton';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import PrimaryButton from 'components/buttons/primaryButton';
import moment from 'moment';

const BookingDetails = ({item}) => {
  const {dismissAll} = useBottomSheetModal();
  return (
    <>
      <View style={styles.buttonContainer}>
        <View style={styles.compensation}>
          <Text style={styles.buttonText}> No concelation compensation</Text>
          <SecondaryButton linearstyle={styles.rate}>
            <Text style={styles.rateText}>$ {item.totalCost * 0.05}</Text>
          </SecondaryButton>
        </View>

        <View style={styles.clearButton}>
          <Text style={[styles.clearButtonText, {color: 'black'}]}>
            Based on your
          </Text>
          <Text style={[styles.clearButtonText, {color: Colors.primary.brand}]}>
            Payment settings
          </Text>
        </View>

        <PrimaryButton onPress={dismissAll} linearstyle={styles.paymentButton}>
          <Text style={styles.paymentText}>MARKED AS PAID</Text>
          <Text style={styles.paymentText}>{item.paidAmount}</Text>
        </PrimaryButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  rate: {
    width: 80,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: Sizing.x20,
  },
  compensation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizing.x20,
  },
  rateText: {
    ...Typography.header.x30,
    color: Colors.neutral.white,
  },
  buttonContainer: {justifyContent: 'flex-end', flex: 1},
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizing.x10,
  },
  buttonText: {...Typography.header.x20, color: Colors.neutral.s500},
  paymentButton: {
    marginVertical: Sizing.x10,
    borderRadius: Sizing.x10,
    marginHorizontal: Sizing.x20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 47,
    paddingHorizontal: Sizing.x20,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  paymentText: {color: Colors.neutral.white, ...Typography.header.x20},
  clearButtonText: {...Typography.header.x10, marginRight: 5},
});

export default BookingDetails;
