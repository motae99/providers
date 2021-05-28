/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity, useBottomSheetModal} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import PrimaryButton from 'components/buttons/primaryButton';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
  textPadding: {paddingHorizontal: 20},
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
  },
  iconContainer: {flexDirection: 'row', paddingHorizontal: 10},
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'green',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {marginHorizontal: 20, marginVertical: 10},
  serviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  serviceImage: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  servicePrice: {padding: 5, fontWeight: 'bold'},
  serviceName: {padding: 0, fontWeight: 'bold'},
  outLineButton: {
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    height: 45,
  },
  buttonContainer: {justifyContent: 'flex-end', flex: 1},
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {color: 'black', fontWeight: 'bold'},
  paymentButton: {
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 47,
    paddingHorizontal: 20,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  paymentText: {color: 'white', fontWeight: 'bold'},
  clearButtonText: {fontWeight: 'bold', marginRight: 5},
});
const Sheet = ({handlePresentModalClose}) => {
  const {dismissAll} = useBottomSheetModal();

  return (
    <View style={styles.container}>
      <Text style={styles.textPadding}>OCT & 10:30 - 08:00 AM</Text>
      <View style={styles.userDetails}>
        <Text style={styles.textPadding}>Dan Simpson & Princes</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="phone" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="mail" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text>Booking Total $200</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
          }}>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceImage} />
            <Text style={styles.servicePrice}>$100</Text>
            <Text style={styles.serviceName}>test services</Text>
          </View>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceImage} />
            <Text style={styles.servicePrice}>$100</Text>
            <Text style={styles.serviceName}>test services</Text>
          </View>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceImage} />
            <Text style={styles.servicePrice}>$100</Text>
            <Text style={styles.serviceName}>test services</Text>
          </View>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceImage} />
            <Text style={styles.servicePrice}>$100</Text>
            <Text style={styles.serviceName}>test services</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.outLineButton}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outLineButton}>
          <Text style={styles.buttonText}>Client No-Show</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={[styles.clearButtonText, {color: 'black'}]}>
            Based on your
          </Text>
          <Text style={[styles.clearButtonText, {color: 'green'}]}>
            Payment settings
          </Text>
        </TouchableOpacity>

        <PrimaryButton onPress={dismissAll} linearstyle={styles.paymentButton}>
          <Text style={styles.paymentText}>MARKED AS PAID</Text>
          <Text style={styles.paymentText}>$100</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

export default Sheet;
