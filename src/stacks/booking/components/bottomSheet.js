import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UserDetails from './bookingDetails';
import ConfirmedFuture from './confirmedFuture';
import Done from './done';
import NoShow from './noShow';
import ConfirmedPast from './confirmedPast';
import moment from 'moment';

const Sheet = ({item}) => {
  console.log(item.status);
  return (
    <View style={styles.container}>
      <UserDetails {...{item}} />
      {item.status === 'done' ? (
        <Done {...{item}} />
      ) : item.status === 'noShow' ? (
        <NoShow {...{item}} />
      ) : Date.now() > moment(item.date).format('x') ? (
        <ConfirmedPast {...{item}} />
      ) : (
        <ConfirmedFuture {...{item}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
});
export default Sheet;
