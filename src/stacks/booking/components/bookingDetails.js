import React from 'react';
import {View, Text, StyleSheet, Dimensions, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import UserImage from 'components/userImage';
import moment from 'moment';
import PrimaryButton from 'components/buttons/primaryButton';

const {width, height} = Dimensions.get('window');
const SERVICE_SIZE = 80;
const ICON_SIZE = 40;

const BookingDetails = ({item}) => {
  return (
    <>
      <Text style={[styles.textPadding, styles.dateTime]}>
        {moment(item.timeStamp).format('MMM Do')}{' '}
        {moment(item.fromTime).format('hh A')} -{' '}
        {moment(item.fromTime).format('hh A')}
      </Text>
      <View style={styles.userDetails}>
        <Text style={[styles.textPadding, styles.userDisplayName]}>
          {item.userDisplayName}
        </Text>
        <View style={styles.iconContainer}>
          <PrimaryButton
            onPress={() => {
              item.providerPhoneNumber
                ? Linking.openURL(`tel:${item.providerPhoneNumber}`)
                : Linking.openURL('tel:87796466');
            }}
            linearstyle={styles.icon}>
            <FontAwesome name="phone" color="white" size={24} />
          </PrimaryButton>

          <UserImage style={styles.icon} uri={item.userPhotoURL} />
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text>Booking Total ${item.totalCost}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: Sizing.x10,
          }}>
          {item.additionalServices.length > 0
            ? item.additionalServices.map((service, index) => {
                return (
                  <View key={index} style={styles.serviceContainer}>
                    <View style={styles.serviceImage} />
                    <Text style={styles.servicePrice}>
                      ${service.data.price}
                    </Text>
                    <Text style={styles.serviceName}>{service.name}</Text>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  textPadding: {paddingHorizontal: Sizing.x20},
  dateTime: {
    ...Typography.header.x10,
    color: Colors.neutral.s400,
  },
  userDisplayName: {
    ...Typography.header.x30,
    color: Colors.neutral.black,
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
  },
  iconContainer: {flexDirection: 'row', paddingHorizontal: 10},
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    marginRight: Sizing.x10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {marginHorizontal: Sizing.x20, marginVertical: Sizing.x10},
  serviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Sizing.x20,
  },
  serviceImage: {
    backgroundColor: 'red',
    width: SERVICE_SIZE,
    height: SERVICE_SIZE,
    borderRadius: SERVICE_SIZE,
    overflow: 'hidden',
  },
  servicePrice: {padding: Sizing.x5, fontWeight: 'bold'},
  serviceName: {padding: 0, fontWeight: 'bold'},
});

export default BookingDetails;
