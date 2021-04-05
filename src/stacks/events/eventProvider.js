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
import StaticMap from 'components/staticMap'
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
  name: Yup.string()
    .label('name')
    .required()
    .min(5, 'Must have at least 10 characters'),
  capacity: Yup.number()
    .label('capacity')
    .required('capacity of your place')
    .min(50)
    .max(1000),
  evening: Yup.number()
    .label('evening')
    .required('evening cost is Required')
    .min(50),
  night: Yup.number().label('night').required('night cost is Required').min(50),
  workingDays: Yup.array()
    .of(Yup.string())
    .required('Required your working Days'),
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

    const {workingDays, name, address, capacity, night, evening} = values;
    try {
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
        name,
        workingDays,
        address,
        capacity,
        night,
        evening,
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
            name: '',
            address: Address,
            capacity: '',
            evening: '',
            night: '',
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
                  name="name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Enter your hallName"
                  leftIcon={
                    <Entypo
                      name="home"
                      size={25}
                      color={Colors.primary.brand}
                    />
                  }
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
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

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '45%'}}>
                  <FormInput
                    name="evening"
                    keyboardType="number-pad"
                    value={values.evening}
                    onChangeText={handleChange('evening')}
                    placeholder="Evening amount"
                    leftIcon={
                      <Fontisto
                        name="day-sunny"
                        size={25}
                        color={Colors.primary.brand}
                      />
                    }
                    onBlur={handleBlur('evening')}
                  />
                  <ErrorMessage
                    errorValue={touched.evening && errors.evening}
                  />
                </View>

                <View style={{width: '45%'}}>
                  <FormInput
                    name="night"
                    keyboardType="number-pad"
                    value={values.night}
                    onChangeText={handleChange('night')}
                    placeholder="Night amount"
                    leftIcon={
                      <Fontisto
                        name="night-clear"
                        size={25}
                        color={Colors.primary.brand}
                      />
                    }
                    onBlur={handleBlur('night')}
                  />
                  <ErrorMessage errorValue={touched.night && errors.night} />
                </View>
              </View>

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
