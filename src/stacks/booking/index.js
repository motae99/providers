/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect, useContext} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';
import moment from 'moment';
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheet from './components/bottomSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from './components/item';
import EmptyDay from './components/emptyDate';
import Knob from './components/knob';
import Header from './components/header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {Sizing, Outlines, Colors, Typography} from 'styles';
const width = Dimensions.get('window').width;
const testIDs = require('components/testIDs');
const backGroundColor = 'rgba(212, 234, 250, 1)';
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
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AgendaScreen = () => {
  const {dbUser} = useContext(AuthContext);
  const tabBarHeight = 60;
  // const tabBarHeight = useBottomTabBarHeight();

  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const bottomSheetModalRef = React.useRef(null);

  const snapPoints = React.useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handlePresentModalClose = React.useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = React.useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

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
  //     .where('status', '==', 'done')
  //     // .limit(2)
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
  //           setLoading(false);
  //         }
  //       }
  //     });
  //   return () => subscriber();
  // }, [dbUser.uid]);

  // console.log(items);

  const RowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView style={{flex: 1}}>
  //       <StatusBar
  //         translucent
  //         backgroundColor={backGroundColor}
  //         barStyle={'dark-content'}
  //       />
  //       <Text>loading ...</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={backGroundColor}
        barStyle={'dark-content'}
      />
      <Header color={backGroundColor} />
      <BottomSheetModalProvider>
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={items}
          // loadItemsForMonth={day => loadItems(day)}
          selected={timeToString(Date())}
          renderItem={item => {
            return <Item {...{item, handlePresentModalPress}} />;
          }}
          renderEmptyDate={day => {
            return <EmptyDay {...{day}} />;
          }}
          rowHasChanged={(r1, r2) => {
            return <RowHasChanged {...{r1, r2}} />;
          }}
          renderKnob={() => {
            return <Knob color={backGroundColor} />;
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
          // renderDay={(day, item) => null}
          // renderDay={(day, item) => {
          //   // console.log('day', day);
          //   // console.log('item', item);
          //   return (
          //     <View
          //       style={{
          //         width: '100%',
          //         height: 20,
          //         borderBottomColor: 'black',
          //         borderBottomWidth: 5,
          //       }}>
          //       <Text style={{flex: 1, height: 20, width: 20}}>
          //         {day ? day.day : null}
          //         <Item {...{item}} />
          //       </Text>
          //     </View>
          //   );
          // }}
          hideExtraDays={true}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: backGroundColor,
            // textSectionTitleColor: Colors.neutral.s400,
            // textSectionTitleDisabledColor: '#d9e1e8',
            // selectedDayBackgroundColor: Colors.primary.s200,
            // selectedDayTextColor: 'navy',
            // todayTextColor: 'blue',
            // dayTextColor: '#2d4150',
            // // textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            // // selectedDotColor: '#ffffff',
            // // arrowColor: 'orange',
            // // disabledArrowColor: '#d9e1e8',
            // // monthTextColor: 'blue',
            // // indicatorColor: 'blue',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            // textDayFontWeight: 'bold',
            // // textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: 'bold',
            // textDayFontSize: 14,
            // textMonthFontSize: 14,
            // textDayHeaderFontSize: 14,
            // ...calendarTheme,
            // agendaDayTextColor: 'yellow',
            // agendaDayNumColor: 'green',
            // agendaTodayColor: 'red',
            // agendaKnobColor: 'gray',
          }}
          // style={{marginBottom: 50}}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheet {...{handlePresentModalClose}} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default AgendaScreen;

// import _ from 'lodash';
// import XDate from 'xdate';
// import React, {Component} from 'react';
// import {
//   Platform,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Button,
// } from 'react-native';
// import {
//   ExpandableCalendar,
//   Timeline,
//   CalendarProvider,
// } from 'react-native-calendars';
// import {sameDate} from './components/dateutils';

// const EVENTS = [
//   {
//     start: '2017-09-06 22:30:00',
//     end: '2017-09-06 23:30:00',
//     title: 'Dr. Mariana Joseph',
//     summary: '3412 Piedmont Rd NE, GA 3032',
//     color: '#e6add8',
//   },
//   {
//     start: '2017-09-07 00:30:00',
//     end: '2017-09-07 01:30:00',
//     title: 'Visit Grand Mother',
//     summary: 'Visit Grand Mother and bring some fruits.',
//     color: '#ade6d8',
//   },
//   {
//     start: '2017-09-07 02:30:00',
//     end: '2017-09-07 03:20:00',
//     title: 'Meeting with Prof. Behjet Zuhaira',
//     summary: 'Meeting with Prof. Behjet at 130 in her office.',
//     color: '#e6add8',
//   },
//   {
//     start: '2017-09-07 04:10:00',
//     end: '2017-09-07 04:40:00',
//     title: 'Tea Time with Dr. Hasan',
//     summary: 'Tea Time with Dr. Hasan, Talk about Project',
//   },
//   {
//     start: '2017-09-07 01:05:00',
//     end: '2017-09-07 01:35:00',
//     title: 'Dr. Mariana Joseph',
//     summary: '3412 Piedmont Rd NE, GA 3032',
//   },
//   {
//     start: '2017-09-07 14:30:00',
//     end: '2017-09-07 16:30:00',
//     title: 'Meeting Some Friends in ARMED',
//     summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
//     color: '#d8ade6',
//   },
//   {
//     start: '2017-09-08 01:40:00',
//     end: '2017-09-08 02:25:00',
//     title: 'Meet Sir Khurram Iqbal',
//     summary: 'Computer Science Dept. Comsats Islamabad',
//     color: '#e6bcad',
//   },
//   {
//     start: '2017-09-08 04:10:00',
//     end: '2017-09-08 04:40:00',
//     title: 'Tea Time with Colleagues',
//     summary: 'WeRplay',
//   },
//   {
//     start: '2017-09-08 00:45:00',
//     end: '2017-09-08 01:45:00',
//     title: 'Lets Play Apex Legends',
//     summary: 'with Boys at Work',
//   },
//   {
//     start: '2017-09-08 11:30:00',
//     end: '2017-09-08 12:30:00',
//     title: 'Dr. Mariana Joseph',
//     summary: '3412 Piedmont Rd NE, GA 3032',
//   },
//   {
//     start: '2017-09-10 12:10:00',
//     end: '2017-09-10 13:45:00',
//     title: 'Merge Request to React Native Calendards',
//     summary: 'Merge Timeline Calendar to React Native Calendars',
//   },
// ];

// export default class TimelineCalendarScreen extends Component {
//   state = {
//     currentDate: '2017-09-07',
//   };

//   onDateChanged = date => {
//     // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
//     // fetch and set data for date + week ahead
//     this.setState({currentDate: date});
//   };

//   onMonthChange = (/* month, updateSource */) => {
//     // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
//   };

//   renderEmptyItem() {
//     return (
//       <View style={styles.emptyItem}>
//         <Text style={styles.emptyItemText}>No Events Planned</Text>
//       </View>
//     );
//   }

//   renderItem = ({item}) => {
//     if (_.isEmpty(item)) {
//       return this.renderEmptyItem();
//     }

//     return (
//       <TouchableOpacity style={styles.item}>
//         <View>
//           <Text style={styles.itemHourText}>{item.hour}</Text>
//           <Text style={styles.itemDurationText}>{item.duration}</Text>
//         </View>
//         <Text style={styles.itemTitleText}>{item.title}</Text>
//         <View style={styles.itemButtonContainer}>
//           <Button title={'Info'} />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   getTheme = () => {
//     const themeColor = '#0059ff';
//     const lightThemeColor = '#e6efff';
//     const disabledColor = '#a6acb1';
//     const black = '#20303c';
//     const white = '#ffffff';

//     return {
//       // arrows
//       arrowColor: black,
//       arrowStyle: {padding: 0},
//       // month
//       monthTextColor: black,
//       textMonthFontSize: 16,
//       textMonthFontFamily: 'HelveticaNeue',
//       textMonthFontWeight: 'bold',
//       // day names
//       textSectionTitleColor: black,
//       textDayHeaderFontSize: 12,
//       textDayHeaderFontFamily: 'HelveticaNeue',
//       textDayHeaderFontWeight: 'normal',
//       // today
//       todayBackgroundColor: lightThemeColor,
//       todayTextColor: themeColor,
//       // dates
//       dayTextColor: themeColor,
//       textDayFontSize: 18,
//       textDayFontFamily: 'HelveticaNeue',
//       textDayFontWeight: '500',
//       textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
//       // selected date
//       selectedDayBackgroundColor: themeColor,
//       selectedDayTextColor: white,
//       // disabled date
//       textDisabledColor: disabledColor,
//       // dot (marked date)
//       dotColor: themeColor,
//       selectedDotColor: white,
//       disabledDotColor: disabledColor,
//       dotStyle: {marginTop: -2},
//     };
//   };

//   render() {
//     return (
//       <CalendarProvider
//         // date={ITEMS[0].title}
//         date={this.state.currentDate}
//         onDateChanged={this.onDateChanged}
//         onMonthChange={this.onMonthChange}
//         theme={{todayButtonTextColor: '#0059ff'}}
//         showTodayButton
//         disabledOpacity={0.6}
//         // todayBottomMargin={16}
//       >
//         <ExpandableCalendar
//           // horizontal={false}
//           // hideArrows
//           // disablePan
//           // hideKnob
//           // initialPosition={ExpandableCalendar.positions.OPEN}
//           firstDay={1}
//           // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
//           // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
//           theme={this.getTheme()}
//           // leftArrowImageSource={require('../img/previous.png')}
//           // rightArrowImageSource={require('../img/next.png')}
//           // calendarStyle={styles.calendar}
//           // headerStyle={styles.calendar} // for horizontal only
//           // disableWeekScroll
//         />
//         <Timeline
//           format24h={true}
//           eventTapped={e => e}
//           events={EVENTS.filter(event =>
//             sameDate(XDate(event.start), XDate(this.state.currentDate)),
//           )}
//           // scrollToFirst={true}
//           // start={0}
//           // end={24}
//         />
//       </CalendarProvider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   calendar: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   section: {
//     backgroundColor: '#f0f4f7',
//     color: '#79838a',
//   },
//   item: {
//     padding: 20,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e8ecf0',
//     flexDirection: 'row',
//   },
//   itemHourText: {
//     color: 'black',
//   },
//   itemDurationText: {
//     color: 'grey',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },
//   itemTitleText: {
//     color: 'black',
//     marginLeft: 16,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   itemButtonContainer: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   emptyItem: {
//     paddingLeft: 20,
//     height: 52,
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e8ecf0',
//   },
//   emptyItemText: {
//     color: '#79838a',
//     fontSize: 14,
//   },
// });
