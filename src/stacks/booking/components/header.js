import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import Feather from 'react-native-vector-icons/Feather';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 30,
    width,
  },
  text: {...Typography.header.x30},
});

const Header = ({color}) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>BOOKINGS</Text>
      <Feather name="bell" size={24} color={Colors.primary.brand} />
    </View>
  );
};

export default Header;
