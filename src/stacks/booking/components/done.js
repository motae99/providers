import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity, useBottomSheetModal} from '@gorhom/bottom-sheet';
import BookingRate from './bookingRate';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import {requestRate} from '../actions';
import PrimaryButton from 'components/buttons/primaryButton';
import SecondaryButton from 'components/buttons/secondaryButton';
import Feather from 'react-native-vector-icons/Feather';
const BookingDetails = ({item}) => {
  const {dismissAll} = useBottomSheetModal();

  return (
    <>
      <View style={styles.buttonContainer}>
        {item.rate ? (
          <BookingRate {...{item}} />
        ) : (
          <TouchableOpacity
            style={styles.outLineButton}
            onPress={() => requestRate(item)}>
            <Text style={styles.buttonText}>Request User Rate</Text>
          </TouchableOpacity>
        )}

        <PrimaryButton onPress={dismissAll} linearstyle={styles.paymentButton}>
          <Text style={styles.paymentText}>DONE</Text>
          <Text style={styles.paymentText}>${item.totalCost}</Text>
        </PrimaryButton>
        {/* <SecondaryButton
          style={styles.checkContainer}
          linearstyle={styles.check}>
          <Feather size={24} name="check" color={Colors.neutral.white} />
        </SecondaryButton> */}
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
    height: 100,
    paddingHorizontal: Sizing.x20,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  paymentText: {color: Colors.neutral.white, ...Typography.header.x30},
  clearButtonText: {...Typography.header.x10, marginRight: 5},
  checkContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  check: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingDetails;
