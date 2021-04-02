/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment, useRef, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Select2 from 'react-native-select-two';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Input, CheckBox} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Sizing, Outlines, Colors, Typography} from 'styles';

import Files from 'components/files';
import FormInput from 'components/formInput';
import FormButton from 'components/formButton';
import ErrorMessage from 'components/errorMessage';

import AddressModal from 'components/addressModal';
import {AuthContext} from 'context/authContext';
import {ProviderContext} from 'context/providerContext';

import firestore from '@react-native-firebase/firestore';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 25,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});

const daysData = [
  {id: 'Sat', name: 'Sat'}, // set default checked for render option item
  {id: 'Sun', name: 'Sun'},
  {id: 'Mon', name: 'Mon'},
  {id: 'Tue', name: 'Tue'},
  {id: 'Wen', name: 'Wen'},
  {id: 'Fri', name: 'Fri'},
];

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .label('Full address')
    .required()
    .min(5, 'Must have at least 10 characters'),
  hallName: Yup.string()
    .label('hallName')
    .required()
    .min(5, 'Must have at least 10 characters'),
  capacity: Yup.number()
    .label('capacity')
    .required('capacity of your place')
    .min(50)
    .max(1000),
  workingDays: Yup.array()
    .of(Yup.string())
    .required('Required your working Days'),
  Evening: Yup.boolean().oneOf([true, false], 'Please check'),
  Night: Yup.boolean().oneOf([true, false], 'Please check'),
  eAmount: Yup.number('Number Only'),
  nAmount: Yup.number('Number Only'),

  // nAmount: Yup.boolean().when('Night', {
  //   is: true,
  //   then: Yup.number().required('Night Amount is required.'),
  // }),
  // contactNo: Yup.string()
  //   .label("contact No")
  //   .required("Plaese submit comtact info")
  //   .matches(phoneRegExp, "Phone number is not valid"),
  // email: Yup.string()
  //   .label("Email")
  //   .email("Enter a valid email")
  //   .required("Please enter a registered email"),
  // check: Yup.boolean().oneOf([true], "Please check the agreement")
});

const EventProvider = () => {
  const {User, dbUser} = useContext(AuthContext);
  const {
    images,
    coordinate,
    uploadLoap,
    setModal,
    region,
    Address,
    geoPoint,
  } = useContext(ProviderContext);

  const [workingDays, addWorkingDays] = useState([]);
  const [eBooking, setEBooking] = useState(false);
  const [nBooking, setNBooking] = useState(false);

  const handleonAdd = async (values, actions) => {
    console.log(values);

    const {
      workingDays,
      hallName,
      address,
      capacity,
      nAmount,
      eAmount,
      Night,
      Evening,
    } = values;
    try {
      if (!Night && !Evening) {
        // show custom error message to tell images must be added
        console.log('eather required');
        actions.setFieldError('NightEvening', 'One must be set');

        return actions.setSubmitting(false);
      }

      if (Evening && eAmount === '') {
        // show custom error message to tell images must be added
        actions.setFieldError(
          'eAmount',
          'Eveing is selected but amount is not set',
        );
        actions.setSubmitting(false);
        return null;
      }
      if (Night && nAmount === '') {
        // show custom error message to tell images must be added
        actions.setFieldError(
          'nAmount',
          'Night is selected but amount is not set',
        );
        actions.setSubmitting(false);
        return null;
      }

      if (!coordinate) {
        // show custom error message to tell images must be added

        actions.setFieldError('corrdinates', 'Pick your location');
        actions.setSubmitting(false);
        return null;
      }

      if (images) {
        await uploadLoap(User);
      } else {
        // show custom error message to tell images must be added
        actions.setFieldError('images', 'Pick your images');
        actions.setSubmitting(false);
        return null;
      }

      const providerData = {
        hallName,
        workingDays,
        address,
        capacity,
        nAmount,
        eAmount,
        Night,
        Evening,
        coordinate,
        geoPoint,
        files: images,
        services: [],
        ownerId: User.uid,
      };

      await firestore()
        .collection('eventProviders')
        .doc(User.uid)
        .set(providerData);
      // this.props.navigation.navigate('ProviderHome')

      actions.resetForm({});
      actions.setStatus({success: true});
      // navigate('Info');
    } catch (error) {
      console.log(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{marginHorizontal: 20, marginTop: 20}}>
        <Formik
          initialValues={{
            workingDays: '',
            hallName: '',
            address: Address,
            capacity: '',
            Evening: false,
            Night: false,
            eAmount: '',
            nAmount: '',
          }}
          onSubmit={(values, actions) => {
            handleonAdd(values, actions);
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
              <View style={{backgroundColor: 'white'}}>
                <FormInput
                  name="hallName"
                  value={values.hallName}
                  onChangeText={handleChange('hallName')}
                  placeholder="Enter your hallName"
                  leftIcon={
                    <Entypo
                      name="home"
                      size={25}
                      color={Colors.primary.brand}
                    />
                  }
                  onBlur={handleBlur('address')}
                />
                <ErrorMessage
                  errorValue={touched.hallName && errors.hallName}
                />
                <Select2
                  isSelectSingle={false}
                  style={{borderRadius: 5, height: 80}}
                  popupTitle="Week Days"
                  title="Working Days"
                  listEmptyTitle="Pick your Days"
                  // defaultFontName=''
                  selectedTitleStyle={{color: Colors.primary.brand}}
                  buttonTextStyle={{color: Colors.primary.brand}}
                  buttonStyle={{borderRadius: 5}}
                  colorTheme={'#cfcfdd'}
                  cancelButtonText="Cancal"
                  selectButtonText="Add"
                  searchPlaceHolderText="Search"
                  data={daysData}
                  onSelect={data => {
                    addWorkingDays(data);
                    setFieldValue('workingDays', data);
                  }}
                  onRemoveItem={data => {
                    addWorkingDays(data);
                    setFieldValue('workingDays', data);
                  }}
                />
              </View>
              <ErrorMessage
                errorValue={touched.workingDays && errors.workingDays}
              />
              {coordinate ? (
                <View
                  style={{
                    height: 200,
                    borderRadius: 8,
                    borderColor: '#cfcfdd',
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  <MapView
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderRadius: 8,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    initialRegion={region}>
                    <Marker
                      title={'Found Address'}
                      description={Address}
                      coordinate={coordinate}
                    />
                  </MapView>

                  <TouchableOpacity
                    style={{position: 'absolute', top: 10, right: 10}}
                    onPress={() => setModal(true)}>
                    <MIcon
                      name="crosshairs-gps"
                      size={35}
                      color={Colors.primary.brand}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: '#cfcfdd',
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                  }}>
                  <TouchableOpacity onPress={() => setModal(true)}>
                    <MIcon
                      name="map-search-outline"
                      size={100}
                      color={Colors.primary.brand}
                    />
                  </TouchableOpacity>

                  <ErrorMessage errorValue={errors.corrdinates} />
                </View>
              )}
              <FormInput
                name="address"
                value={values.address}
                onChangeText={handleChange('address')}
                placeholder="Enter your address"
                leftIcon={
                  <Entypo
                    name="address"
                    size={25}
                    color={Colors.primary.brand}
                  />
                }
                onBlur={handleBlur('address')}
              />
              <ErrorMessage errorValue={touched.address && errors.address} />

              <FormInput
                name="capacity"
                keyboardType="number-pad"
                value={values.capacity}
                onChangeText={handleChange('capacity')}
                placeholder="Place capacity"
                leftIcon={
                  <MIcon
                    name="table-column-width"
                    size={25}
                    color={Colors.primary.brand}
                  />
                }
                onBlur={handleBlur('capacity')}
              />
              <ErrorMessage errorValue={touched.capacity && errors.capacity} />
              {/*
              <View style={{justifyContent: 'center'}}>
                <CheckBox
                  // containerStyle={
                  //   {
                  //     // backgroundColor: '#fff',
                  //     // borderColor: '#fff',
                  //     // borderRadius: 5,
                  //     // width: '100%',
                  //   }
                  // }
                  checkedIcon={
                    <Fontisto name="day-haze" size={25} color={'#cfcfdd'} />
                  }
                  day-sunny
                  // iconType="material"
                  uncheckedIcon={
                    <Fontisto name="day-sunny" size={25} color="#f9c22e" />
                  }
                  title="Evening Booking"
                  checkedTitle="Set Price"
                  checked={values.Evening}
                  onPress={() => {
                    setFieldValue('Evening', !values.Evening);
                    if (eBooking) {
                      setEBooking(false);
                      setFieldValue('eAmount', '');
                    } else {
                      setEBooking(true);
                    }
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    width: width / 2,
                    opacity: eBooking ? 1 : 0,
                  }}>
                  <Input
                    disabled={!eBooking}
                    placeholder="المبلغ"
                    keyboardType="number-pad"
                    leftIcon={
                      <Ionicons
                        name="ios-pricetags"
                        size={25}
                        color={Colors.primary.brand}
                      />
                    }
                    // style={{fontFamily: StyleGuide.fontFamily}}
                    value={values.eAmount}
                    onChangeText={handleChange('eAmount')}
                    errorStyle={{color: 'red'}}
                    errorMessage="ENTER A VALID NUMBER HERE"
                  />
                  <ErrorMessage errorValue={errors.eAmount} />
                </View>
              </View>

              <View style={{justifyContent: 'center'}}>
                <CheckBox
                  // containerStyle={{
                  //   backgroundColor: '#fff',
                  //   borderColor: '#fff',
                  //   borderRadius: 5,
                  //   width: '100%',
                  // }}
                  checkedIcon={
                    <MIcon
                      name="weather-night"
                      size={25}
                      color={Colors.primary.brand}
                    />
                  }
                  day-sunny
                  // iconType="material"
                  uncheckedIcon={
                    <Fontisto name="night-clear" size={25} color="#5d576b" />
                  }
                  title="Night Booking"
                  checkedTitle="Set Price"
                  checked={values.Night}
                  onPress={() => {
                    setFieldValue('Night', !values.Night);
                    if (nBooking) {
                      setNBooking(false);
                      setFieldValue('nAmount', '');
                    } else {
                      setNBooking(true);
                    }
                  }}
                />
                <ErrorMessage errorValue={errors.NightEvening} />

                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    width: width / 2,
                    opacity: nBooking ? 1 : 0,
                  }}>
                  <Input
                    disabled={!nBooking}
                    placeholder="Amount"
                    keyboardType="number-pad"
                    leftIcon={
                      <Ionicons
                        name="ios-pricetags"
                        size={25}
                        color={Colors.primary.brand}
                      />
                    }
                    style={styles}
                    value={values.nAmount}
                    onChangeText={handleChange('nAmount')}
                    errorStyle={{color: 'red'}}
                    // errorMessage="ENTER A VALID ERROR HERE"
                  />
                  <ErrorMessage errorValue={errors.nAmount} />
                </View>
              </View> */}

              <Files />
              <ErrorMessage errorValue={errors.images} />

              <View>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="ADD Provider"
                  buttonColor={Colors.primary.brand}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
      {AddressModal()}
    </SafeAreaView>
  );
};

export default EventProvider;
