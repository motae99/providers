/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Sizing, Typography, Colors} from 'styles';

// console.log('From time', moment(item.fromTime).format('hh A'));
// console.log('Totime', moment(item.ToTime).format('hh A'));
const backgroundColor = 'rgba(229, 192, 240, .3)';
const color = Colors.secondary.brand;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Sizing.x10,
    paddingVertical: Sizing.x10,
  },
  firstSection: {
    flex: 6,
    backgroundColor,
    borderRadius: Sizing.x5,
  },
  top: {flex: 5, borderBottomWidth: 2, borderBottomColor: Colors.neutral.white},
  innterTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Sizing.x20,
  },
  userText: {
    fontWeight: 'bold',
    width: '80%',
    fontSize: 16,
    color,
    paddingTop: Sizing.x5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.neutral.white,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Sizing.x20,
    paddingRight: 15,
    paddingVertical: Sizing.x10,
  },
  serviceTitle: {
    ...Typography.header.x20,
    color,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x10,
    flex: 1,
  },
  status: {
    ...Typography.header.x20,
    color,
  },
});

const Booked = ({item}) => {
  const services = item.additionalServices.length;
  const serviceTitle =
    services === 1
      ? item.additionalServices[0].name
      : '# ' + services + ' requested';
  const photo = item.userPhotoURL
    ? {uri: item.userPhotoURL}
    : require('assets/img/UserPhoto.jpeg');
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <View style={styles.top}>
          <View style={styles.innterTop}>
            <View style={{paddingTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>
                {moment(item.fromTime).format('hh:mm')}
                {' - '}
                {moment(item.toTime).format('hh:mm A')}
              </Text>
              <Text numberOfLines={2} style={styles.userText}>
                {item.userDisplayName}
              </Text>
            </View>
            <View style={{padding: 10}}>
              <Image source={photo} style={styles.image} />
            </View>
          </View>
          <View style={styles.services}>
            <Text style={styles.serviceTitle}>{serviceTitle}</Text>
            <Text style={styles.serviceTitle}>${item.totalCost}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.status}>BOOKED</Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome
              size={20}
              name="ticket"
              color={color}
              style={{marginRight: 20}}
            />
            <FontAwesome size={20} name="phone" color={color} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Booked;
