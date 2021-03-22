/* eslint-disable react-native/no-inline-styles */

import React, {useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from 'context/authContext';
import I18n from 'utils/i18n';

const App = ({navigation}) => {
  const {phoneSign, User, connectPhone} = React.useContext(AuthContext);

  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  return (
    <>
      {showMessage && (
        <View style={styles.message}>
          <Text>Country Code : {countryCode}</Text>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? 'true' : 'false'}</Text>
        </View>
      )}
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        placeholder={I18n.t('phoneInputPlaceHolder')}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        flagButtonStyle={styles.flagButton}
        textInputStyle={styles.textInputStyle}
        countryPickerButtonStyle={styles.countryPickerButtonStyle}
        defaultCode="SD"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
          setCountryCode(phoneInput.current?.getCountryCode() || '');
        }}
        countryPickerProps={{withAlphaFilter: true}}
        disabled={disabled}
        // disableArrowIcon
        // withShadow
        // autoFocus
      />

      <TouchableOpacity
        style={styles.sendCodeButton}
        onPress={async () => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          // setShowMessage(true);
          setValid(checkValid ? checkValid : false);
          setCountryCode(phoneInput.current?.getCountryCode() || '');
          let getNumberAfterPossiblyEliminatingZero = await phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
          // console.log(getNumberAfterPossiblyEliminatingZero);
          let number = getNumberAfterPossiblyEliminatingZero.formattedNumber;
          if (valid) {
            User ? connectPhone(number) : phoneSign(number);
          }
        }}>
        <LinearGradient
          colors={['#00DAEA', '#219CAB']}
          style={styles.sendCodeButton}>
          <Text style={styles.sendCodeText}>
            {I18n.t('phoneGetCodeButton')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    width: '100%',
    borderRadius: 12,
    height: 60,
    marginTop: 40,
    alignItems: 'center',
  },
  textContainer: {
    borderRadius: 15,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagButton: {
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderRightWidth: 1,
  },
  textInputStyle: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 22,
    letterSpacing: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryPickerButtonStyle: {},
  sendCodeButton: {
    height: 54,
    width: '100%',
    borderRadius: 12,
    marginTop: 36,
    // backgroundColor: '#55DAEA',
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: rgba(73, 204, 220, 0.4),
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 5,
  },
  sendCodeText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    fontFamily: 'Gilroy',
    letterSpacing: 3,
    color: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    position: 'absolute',
    bottom: 100,
  },
});

export default App;
