import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from 'styles';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});

const Nav = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        size={20}
        color={Colors.neutral.black}
        name="filter-list"
      />
      <MaterialCommunityIcons
        size={24}
        color={Colors.neutral.black}
        name="bell-outline"
      />
    </View>
  );
};

export default Nav;
