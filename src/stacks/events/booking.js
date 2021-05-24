/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect, useContext} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Sizing, Outlines, Colors, Typography} from 'styles';

const testIDs = require('components/testIDs');

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 200,
    // width: 100,
    // flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AgendaScreen = () => {
  const {dbUser} = useContext(AuthContext);

  const [items, setItems] = useState({});
  const [bookings, setBookings] = useState([]);

  // bookings.forEach(booking => {
  //   if (moment(booking.date).format('YYYY-MM-DD') === strTime) {
  //     items[strTime].push({
  //       name:
  //         'Item for ' + booking.userDisplayName + ' # ' + booking.providerName,
  //       // height: Math.max(50, Math.floor(Math.random() * 150)),
  //       height: 150,
  //     });
  //   }
  // });
  useMemo(() => {
    const day = Date.now();
    setTimeout(() => {
      for (let i = -90; i < 120; i++) {
        const time = day + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
        bookings.forEach(booking => {
          const bookingDate = moment(booking.date).format('YYYY-MM-DD');
          if (bookingDate === strTime) {
            var index = items[strTime].findIndex(x => x.key === booking.key);
            index === -1 ? items[strTime].push(booking) : null;
          }
        });
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(items);
      // return items;
    }, 1000);
  }, [bookings, items]);

  // const loadItems = day => {
  //   // console.log(day);
  //   // console.log( Date.now());
  //   // const day = Date.now();
  //   setTimeout(() => {
  //     for (let i = -90; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     // setItems(items);

  //     const newItems = {};
  //     Object.keys(items).forEach(key => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(items);
  //   }, 1000);
  // };

  // .where('providerId', '==', dbUser.uid)

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('bookings')
  //     // .where('providerId', '==', dbUser.uid)
  //     .orderBy('timeStamp', 'asc')
  //     .onSnapshot(querySnapshot => {
  //       if (querySnapshot) {
  //         const data = querySnapshot.docs.map(documentSnapshot => {
  //           return {
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           };
  //         });
  //         if (data && data.length > 0) {
  //           setBookings(data);
  //         }
  //       }
  //     });
  //   return () => subscriber();
  // }, [dbUser.uid]);

  // console.log(items);

  const RenderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No Booking on this Data how should we design this</Text>
      </View>
    );
  };

  const RowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const RenderItem = ({item}) => {
    const services = item.additionalServices.length;
    return (
      // <TouchableOpacity
      //   // testID={testIDs.agenda.ITEM}
      //   style={styles.item}
      //   onPress={() => Alert.alert(item.userDisplayName)}>
      //   <Text>{item.providerName}</Text>
      //   <Text>{item.userDisplayName}</Text>
      //   <Text>{item.basicCost}</Text>
      //   <Text>{item.bookingStatus}</Text>
      //   <Text>{moment(item.date).format('YYYY-MM-DD')}</Text>
      // </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 180,
          flex: 1,
          margin: 10,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 5,
            height: '100%',
            // justifyContent: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <FontAwesome name="user" size={16} color={Colors.secondary.brand} />
            <Text style={{color: Colors.secondary.brand}}>
              {'  '}client name :{' '}
            </Text>
            <Text style={{}}>{item.userDisplayName}</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Entypo name="price-tag" size={16} color={Colors.secondary.brand} />
            <Text style={{color: Colors.secondary.brand}}>
              {'  '}TotalCost :{' '}
            </Text>
            <Text style={{}}>{item.basicCost}</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Feather
              name="git-pull-request"
              size={16}
              color={Colors.secondary.brand}
            />
            <Text style={{color: Colors.secondary.brand}}>
              {'  '}Services :{' '}
            </Text>
            <Text style={{}}># {services} requested</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
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
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary.brand,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '48%',
                padding: 10,
              }}>
              <Feather name="phone-call" size={16} color={'white'} />
              <Text numberOfLines={1} style={{color: 'white'}}>
                {' '}
                {item.userPhoneNumber}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary.brand,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '48%',
                padding: 10,
              }}>
              <Entypo name="location-pin" size={16} color={'white'} />
              <Text style={{color: 'white'}}> location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <FontAwesome
                name="money"
                size={16}
                color={Colors.secondary.brand}
              />
              <Text style={{color: Colors.secondary.brand, margin: 5}}>
                {' '}
                Cash{' '}
              </Text>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <FontAwesome
                name="money"
                size={16}
                color={Colors.secondary.brand}
              />
              <Text style={{color: Colors.secondary.brand, margin: 5}}>
                {' '}
                Cash{' '}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary.brand,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                margin: 4,
                padding: 8,
                borderRadius: 5,
              }}>
              <Feather name="thumbs-up" size={16} color={'white'} />
              <Text style={{color: 'white'}}> Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary.brand,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                margin: 4,
                padding: 8,
                borderRadius: 5,
              }}>
              <MaterialCommunityIcons name="cancel" size={16} color={'white'} />
              <Text style={{color: 'white'}}> Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Agenda
      testID={testIDs.agenda.CONTAINER}
      items={items}
      // loadItemsForMonth={day => loadItems(day)}
      selected={timeToString(Date())}
      renderItem={item => {
        return <RenderItem {...{item}} />;
      }}
      renderEmptyDate={() => {
        return <RenderEmptyDate />;
      }}
      rowHasChanged={(r1, r2) => {
        return <RowHasChanged {...{r1, r2}} />;
      }}
      // markingType={'period'}
      // markedDates={{
      //   //    '2017-05-08': {textColor: '#43515c'},
      //   '2021-04-18': {textColor: '#43515c'},
      //   '2021-04-19': {color: 'gray'},
      //   //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //   //    '2017-05-21': {startingDay: true, color: 'blue'},
      //   //    '2017-05-22': {endingDay: true, color: 'gray'},
      //   //    '2017-05-24': {startingDay: true, color: 'gray'},
      //   //    '2017-05-25': {color: 'gray'},
      //   '2017-05-26': {endingDay: true, color: 'gray'},
      // }}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      renderDay={(day, item) => null}
      // renderDay={(day, item) => <Text style={{}}>{day ? day.day : null}</Text>}
      hideExtraDays={true}
    />
  );
};

export default AgendaScreen;
