import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

import moment from 'moment';

const styles = StyleSheet.create({
  emptyDate: {
    flex: 1,
    borderColor: Colors.neutral.s200,
    borderWidth: 1,
    padding: Sizing.x10,
    margin: Sizing.x10,
    borderRadius: 5,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {...Typography.header.x20},
});

const RenderEmptyDate = ({day, handlePresentModalPress}) => {
  const date = day ? moment(day).format('YYYY:MM:DD') : 'no Date';
  return (
    <View style={styles.emptyDate}>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <Text style={styles.text}>{date}</Text>
      <Text style={{...Typography.header.x30, color: Colors.primary.brand}}>
        No Booking
      </Text>
    </View>
  );
};

export default RenderEmptyDate;
