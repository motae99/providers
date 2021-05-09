/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
    flex: 1,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: Outlines.borderRadius.base,
  },
  dataContainer: {
    flex: 5,
    height: '100%',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    height: '100%',
    alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center', padding: 5},
  color: {color: Colors.secondary.brand, paddingHorizontal: 10},
  rowNoPadding: {alignItems: 'center', flexDirection: 'row'},
  iconCash: {color: Colors.secondary.brand, margin: 5},
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 4,
    padding: 8,
    borderRadius: 5,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '48%',
    padding: 10,
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    width: 220,
  },
  downButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  dateTime: {flexDirection: 'row'},
});
const BookingCard = ({item, index, action}) => {
  const services = item.additionalServices.length;
  const prev =
    moment(item.date).format('YYYY-MM-DD') <
    moment(Date.now()).format('YYYY-MM-DD')
      ? true
      : false;

  return (
    // <Animatable.View
    //   animation={'fadeInUp'}
    //   delay={index * 400}
    //   duration={400}
    //   useNativeDriver={true}>
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <FontAwesome name="user" size={16} color={Colors.secondary.brand} />
          <Text style={styles.color}>provider name : </Text>
          <Text numberOfLines={1} style={{width: 100}}>
            {item.userDisplayName}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="price-tag" size={16} color={Colors.secondary.brand} />
          <Text style={styles.color}>TotalCost : </Text>
          <Text style={{}}>{item.totalCost}</Text>
        </View>
        <View style={styles.row}>
          <Feather
            name="git-pull-request"
            size={16}
            color={Colors.secondary.brand}
          />
          <Text style={[styles.color, {}]}>
            {services === 1
              ? item.additionalServices[services - 1].name + ' :'
              : 'Services :'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              action('services', item);
            }}>
            <Text>
              {services === 1
                ? item.additionalServices[services - 1].data.price
                : '# ' + services + ' requested'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTime}>
            <FontAwesome
              name="calendar"
              size={16}
              color={Colors.primary.brand}
            />
            <Text style={{color: Colors.primary.brand}}>
              {' '}
              {moment(item.date).format('YYYY-MM-DD')}
            </Text>
          </View>
          <View style={styles.dateTime}>
            <Entypo
              name="back-in-time"
              size={16}
              color={Colors.primary.brand}
            />
            <Text style={{color: Colors.primary.brand}}>
              {' '}
              {item.time === 'night' ? '9PM - 11PM' : '4PM - 7PM'}
            </Text>
          </View>
        </View>
        <View style={{}}>
          <View style={styles.downButton}>
            <TouchableOpacity
              onPress={() => {
                item.providerPhoneNumber
                  ? Linking.openURL(`tel:${item.providerPhoneNumber}`)
                  : Linking.openURL('tel:87796466');
              }}
              style={[
                {
                  backgroundColor: Colors.primary.brand,
                },
                styles.touchable,
              ]}>
              <Feather name="phone-call" size={16} color={'white'} />
              <Text numberOfLines={1} style={{color: 'white'}}>
                {item.userPhoneNumber}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                const url = item.coordinate
                  ? scheme +
                    `${item.coordinate.latitude},${item.coordinate.longitude}`
                  : scheme;
                Linking.openURL(url);
              }}
              style={[
                {
                  backgroundColor: Colors.secondary.brand,
                },
                styles.touchable,
              ]}>
              <Entypo name="location-pin" size={16} color={'white'} />
              <Text style={{color: 'white'}}>location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {prev ? null : (
        <View style={styles.buttonContainer}>
          {item.bookingStatus === 'confirmed' ? (
            <View style={{flex: 1}}>
              <View style={styles.rowNoPadding}>
                <FontAwesome
                  name="bank"
                  size={16}
                  color={Colors.secondary.brand}
                />
                <Text style={styles.iconCash}> 00 </Text>
              </View>
              <View style={styles.rowNoPadding}>
                <FontAwesome
                  name="money"
                  size={16}
                  color={Colors.secondary.brand}
                />
                <Text style={styles.iconCash}>
                  {' '}
                  {item.paidAmount
                    ? item.totalCost - item.paidAmount
                    : item.totalCost}{' '}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}} />
          )}
          <View style={{flex: 1}}>
            {item.bookingStatus === 'booked' ? (
              <TouchableOpacity
                onPress={() => {
                  action('confirm', item);
                }}
                style={[
                  {
                    backgroundColor: Colors.secondary.brand,
                  },
                  styles.Button,
                ]}>
                <Feather name="thumbs-up" size={16} color={'white'} />
                <Text style={{color: 'white'}}> Confirm</Text>
              </TouchableOpacity>
            ) : (
              <View style={{height: 45}} />
            )}

            <TouchableOpacity
              onPress={() => {
                action('cancel', item);
              }}
              style={[
                {
                  backgroundColor: Colors.primary.brand,
                },
                styles.Button,
              ]}>
              <MaterialCommunityIcons name="cancel" size={16} color={'white'} />
              <Text style={{color: 'white'}}> Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
    </View>
    // </Animatable.View>
  );
};
export default BookingCard;
