import React, {ComponentProps} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'GothamRounded-Medium',
    marginRight: 8,
  },
});

const Row = ({label, icon}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert(label)}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Icon name={icon} color="white" size={24} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Row;
