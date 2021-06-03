import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity, useBottomSheetModal} from '@gorhom/bottom-sheet';
import {done, clientNoShow} from '../actions';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import PrimaryButton from 'components/buttons/primaryButton';

const BookingDetails = ({item}) => {
  const {dismissAll} = useBottomSheetModal();
  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.outLineButton}
          onPress={() => clientNoShow(item)}>
          <Text style={styles.buttonText}>Client No-Show</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outLineButton}
          onPress={() => done(item)}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={[styles.clearButtonText, {color: 'black'}]}>
            Based on your
          </Text>
          <Text style={[styles.clearButtonText, {color: Colors.primary.brand}]}>
            Payment settings
          </Text>
        </TouchableOpacity>

        <PrimaryButton onPress={dismissAll} linearstyle={styles.paymentButton}>
          <Text style={styles.paymentText}>MARKED AS PAID</Text>
          <Text style={styles.paymentText}>{item.paidAmount}</Text>
        </PrimaryButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  outLineButton: {
    marginVertical: Sizing.x10,
    borderRadius: Sizing.x10,
    marginHorizontal: Sizing.x20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.neutral.s200,
    borderWidth: 2,
    height: 45,
  },
  buttonContainer: {justifyContent: 'flex-end', flex: 1},
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizing.x10,
  },
  buttonText: {...Typography.header.x30, color: Colors.neutral.s500},
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
