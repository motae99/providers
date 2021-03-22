import React from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Icon name={iconName} size={20} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="rgba(0, 0, 0, 0.5)"
      keyboardType={keyboardType}
      name={name}
      placeholder={placeholder}
      style={styles.input}
      inputContainerStyle={{borderBottomWidth: 0}}
    />
  </View>
);

const styles = StyleSheet.create({
  // inputContainer: {
  //   margin: 15
  // },
  // iconStyle: {
  //   marginRight: 10
  // }
  input: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    marginHorizontal: 0,
    marginTop: 5,
    height: 45,
    backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default FormInput;
