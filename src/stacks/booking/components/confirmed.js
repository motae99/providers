/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Sizing, Outlines, Colors} from 'styles';
import Corner from 'assets/svg/corner';
const Booked = ({item, handlePresentModalPress}) => {
  // console.log('From time', moment(item.fromTime).format('hh A'));
  // console.log('Totime', moment(item.ToTime).format('hh A'));
  const backgroundColor = 'rgba(167,239,235, .3)';
  const color = Colors.primary.brand;

  const services = item.additionalServices.length;
  const serviceTitle =
    services === 1
      ? item.additionalServices[0].name
      : '# ' + services + ' requested';
  const photo = item.userPhotoURL
    ? {uri: item.userPhotoURL}
    : require('assets/img/UserPhoto.jpeg');
  return (
    <TouchableWithoutFeedback onPress={handlePresentModalPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          // height: 200,
          // width: 200,
          paddingHorizontal: 10,
          paddingVertical: 10,
          // marginVertical: 10,
        }}>
        <View
          style={{
            flex: 6,
            backgroundColor,
            borderRadius: 10,
          }}>
          <View
            style={{flex: 5, borderBottomWidth: 2, borderBottomColor: 'white'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
              }}>
              <View style={{paddingTop: 20}}>
                <Text style={{fontWeight: 'bold'}}>
                  {moment(item.fromTime).format('hh:mm')}
                  {' - '}
                  {moment(item.toTime).format('hh:mm A')}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontWeight: 'bold',
                    width: '80%',
                    fontSize: 16,
                    color,
                    paddingTop: 5,
                  }}>
                  {item.userDisplayName}
                </Text>
              </View>
              <View style={{padding: 10}}>
                <Image
                  source={photo}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 15,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                }}>
                {serviceTitle}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color,
                }}>
                ${item.totalCost}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 12,
              flex: 1,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color,
              }}>
              CONFIRMED
            </Text>
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

        <View style={{position: 'absolute', top: 5, right: 5}}>
          <Corner />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Booked;
