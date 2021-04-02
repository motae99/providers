/* eslint-disable react-native/no-inline-styles */

import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from 'context/authContext';
import I18n from 'utils/i18n';

const App = () => {
  const {phoneVerify, verifyConnectPhone, User} = React.useContext(AuthContext);

  const [code, setCode] = useState('');

  const codeInputRef = useRef(null);

  const onFulfill = code => {
    console.log('onFullfill', code);
  };

  const onFinishCheckingCode = isValid => {
    console.log('onFinish Validity', isValid);
    User ? verifyConnectPhone(isValid) : phoneVerify(isValid);
  };

  return (
    <>
      <View style={{height: 70}}>
        <CodeInput
          ref={codeInputRef}
          keyboardType="numeric"
          codeLength={6}
          // compareWithCode="123456"
          autoFocus={false}
          ignoreCase={true}
          inputPosition="center"
          size={46}
          space={8}
          onFulfill={isValid => onFinishCheckingCode(isValid)}
          // onFulfill={() => setVerify(code)}
          containerStyle={{marginTop: 44, width: '100%'}}
          codeInputStyle={{
            borderWidth: 1.5,
            borderRadius: 10,
            fontSize: 19,
            fontWeight: 'bold',
          }}
          activeColor="#7A18BB"
          inactiveColor="rgba(0,0,0,0.2)"
          onCodeChange={code => {
            setCode(code);
          }}
        />
      </View>

      <TouchableOpacity style={styles.sendCodeButton} onPress={() => {}}>
        <LinearGradient
          colors={['#55DAEA', '#219CAB']}
          style={styles.sendCodeButton}>
          <Text style={styles.sendCodeText}>{I18n.t('CodeInputVerify')}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.subtitle}>{I18n.t('CodeInputNoCode')}</Text>
        <Text
          style={{
            marginLeft: 10,
            justifyContent: 'flex-end',
            alignSelf: 'center',
            color: '#219CAB',
            fontSize: 14,
            lineHeight: 18,
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
          }}>
          {I18n.t('CodeInputResend')}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
