/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, Fragment, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button, CheckBox, ButtonGroup} from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/formInput';
import FormButton from 'components/formButton';
import ErrorMessage from 'components/errorMessage';
import PhoneInput from 'react-native-phone-number-input';

import {AuthContext} from 'context/authContext';
import I18n from 'utils/i18n';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {width, height} = Dimensions.get('window');
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  phoneNumber: Yup.string()
    .label(I18n.t('signUpNameLabel'))
    .required(I18n.t('signUpNameRequiredError'))
    .min(2, I18n.t('signUpNameError')),
  name: Yup.string()
    .label(I18n.t('signUpNameLabel'))
    .required(I18n.t('signUpNameRequiredError'))
    .min(2, I18n.t('signUpNameError')),
  email: Yup.string()
    .label(I18n.t('signUpEmailLabel'))
    .email(I18n.t('signUpEmailError'))
    .required(I18n.t('signUpEmailRequiredError')),
  password: Yup.string()
    .label('Password')
    .required(I18n.t('signUpPasswordRequiredError'))
    .min(6, I18n.t('signUpPasswordError')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], I18n.t('signUpconfirmPasswordError'))
    .required(I18n.t('signUpconfirmPasswordRequiredError')),
  check: Yup.boolean().oneOf([true], I18n.t('signUpCheckBoxError')),
});

const SignUp = ({navigation}) => {
  const {signUp} = useContext(AuthContext);
  const phoneInput = useRef(null);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true,
  );
  const [passwordIcon, setPasswordIcon] = useState('ios-eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('ios-eye');
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState(null);

  const [serviceType, selectserviceType] = useState(null);

  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePasswordVisibility = () => {
    passwordIcon === 'ios-eye'
      ? setPasswordIcon('ios-eye-off')
      : setPasswordIcon('ios-eye');
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    confirmPasswordIcon === 'ios-eye'
      ? setConfirmPasswordIcon('ios-eye-off')
      : setConfirmPasswordIcon('ios-eye');
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleOnSignup = async (values, actions) => {
    const {name, email, password, phoneNumber} = values;
    // console.log('phoneNumber', phoneNumber);
    try {
      let signed = await signUp({name, email, password, serviceType, phone});
      if (signed) {
        navigation.navigate('Phone');
      }
    } catch (error) {
      console.log(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          confirmPassword: '',
          check: false,
        }}
        onSubmit={async (values, actions) => {
          // const checkValid = phoneInput.current?.isValidNumber(value);
          // // setShowMessage(true);
          // setValid(checkValid ? checkValid : false);
          // setCountryCode(phoneInput.current?.getCountryCode() || '');
          // let getNumberAfterPossiblyEliminatingZero = await phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
          // // console.log(getNumberAfterPossiblyEliminatingZero);
          // let addNumber = getNumberAfterPossiblyEliminatingZero.formattedNumber;
          // setPhone(addNumber);
          // if (valid) {
          //   handleOnSignup(values, actions);
          // }
          handleOnSignup(values, actions);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Fragment>
            <Picker
              style={{marginTop: 30}}
              selectedValue={serviceType}
              onValueChange={(itemIndex, itemValue) => {
                setFieldValue('serviceType', itemIndex);
                selectserviceType(itemIndex);
              }}>
              <Picker.Item label="Service Type" value={null} key={0} />
              {/* {services.map(serviceType => {
                return (
                  <Picker.Item
                    key={serviceType.key}
                    label={serviceType.name}
                    value={serviceType.name}
                  />
                );
              })} */}
              <Picker.Item key={'123'} label={'Events'} value={'Events'} />
              <Picker.Item
                key={'124'}
                label={'Event Planner'}
                value={'Event Planner'}
              />
              <Picker.Item key={'1235'} label={'Beauty'} value={'Beauty'} />
              <Picker.Item
                key={'1236'}
                label={'Photography'}
                value={'Photography'}
              />
            </Picker>

            <FormInput
              name="name"
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder={I18n.t('signUpNamePlaceHolder')}
              iconName="account-edit"
              iconColor="#2C384A"
              onBlur={handleBlur('name')}
            />
            <ErrorMessage errorValue={touched.name && errors.name} />

            <FormInput
              name="phoneNumber"
              // keyboardType="number-pad"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              placeholder="Phone Number"
              iconName="phone"
              iconColor="#2C384A"
              onBlur={handleBlur('phoneNumber')}
            />
            <ErrorMessage
              errorValue={touched.phoneNumber && errors.phoneNumber}
            />

            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder={I18n.t('signUpEmailPlaceHolder')}
              autoCapitalize="none"
              iconName="email"
              iconColor="#2C384A"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={I18n.t('signUpPasswordPlaceHolder')}
              iconName="onepassword"
              iconColor="#2C384A"
              onBlur={handleBlur('password')}
              secureTextEntry={passwordVisibility}
              rightIcon={
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Ionicon name={passwordIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <FormInput
              name="password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder={I18n.t('signUpConfirmPasswordPlaceHolder')}
              iconName="onepassword"
              iconColor="#2C384A"
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={confirmPasswordVisibility}
              rightIcon={
                <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                  <Ionicon name={confirmPasswordIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage
              errorValue={touched.confirmPassword && errors.confirmPassword}
            />
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              checkedIcon="check-box"
              iconType="material"
              uncheckedIcon="check-box-outline-blank"
              title="Agree to terms and conditions"
              checkedTitle={I18n.t('signUpCheckedTitle')}
              checked={values.check}
              onPress={() => setFieldValue('check', !values.check)}
            />
            <ErrorMessage errorValue={touched.check && errors.check} />

            {serviceType ? (
              <View style={styles.buttonContainer}>
                <FormButton
                  // buttonType="outline"
                  onPress={handleSubmit}
                  title={I18n.t('signUpSubmitButtonTitle')}
                  buttonColor={Colors.primary.brand}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            ) : null}
            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
      <Button
        title={I18n.t('signUpHaveAccountTitle')}
        onPress={() => navigation.navigate('Login')}
        titleStyle={{
          color: '#039BE5',
        }}
        type="clear"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.s100,
    padding: 20,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  phoneContainer: {
    width: '100%',
    borderRadius: 12,
    height: 60,
    marginBottom: 15,
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
export default SignUp;
