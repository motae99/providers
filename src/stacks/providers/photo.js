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
import * as geofirestore from 'geofirestore';

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
  inDoor: Yup.number()
    .label('inDoor')
    .required('inDoor cost is Required')
    .min(50),
  outDoor: Yup.number()
    .label('outDoor')
    .required('outDoor cost is Required')
    .min(50),
  party: Yup.number().label('party').required('party cost is Required').min(50),
  workingDays: Yup.array()
    .of(Yup.string())
    .required('Required your working Days'),
});

const EventProvider = () => {
  const {User, dbUser} = useContext(AuthContext);
  const {images, uploadLoap, setModal, region, Address, query} = useContext(
    ProviderContext,
  );

  const [workingDays, addWorkingDays] = useState([]);

  const handleonAdd = async (values, actions) => {
    console.log(values);

    const {workingDays, name, address, inDoor, outDoor, party} = values;
    try {
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
        inDoor,
        outDoor,
        party,
        files: images,
        services: ['inDoor', 'outDoor'],
        ownerId: User.uid,
      };

      await query.set(providerData);

      actions.resetForm({});
      actions.setStatus({success: true});
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
            inDoor: '',
            outDoor: '',
            party: '',
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
                  placeholder="Studio Name"
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
                name="inDoor"
                keyboardType="number-pad"
                value={values.inDoor}
                onChangeText={handleChange('inDoor')}
                placeholder="inDoor amount"
                leftIcon={
                  <Fontisto
                    name="day-sunny"
                    size={25}
                    color={Colors.primary.brand}
                  />
                }
                onBlur={handleBlur('inDoor')}
              />
              <ErrorMessage errorValue={touched.inDoor && errors.inDoor} />

              <FormInput
                name="outDoor"
                keyboardType="number-pad"
                value={values.outDoor}
                onChangeText={handleChange('outDoor')}
                placeholder="outDoor amount"
                leftIcon={
                  <Fontisto
                    name="outDoor-clear"
                    size={25}
                    color={Colors.primary.brand}
                  />
                }
                onBlur={handleBlur('outDoor')}
              />
              <ErrorMessage errorValue={touched.outDoor && errors.outDoor} />

              <FormInput
                name="Party"
                keyboardType="number-pad"
                value={values.party}
                onChangeText={handleChange('party')}
                placeholder="party amount"
                leftIcon={
                  <Fontisto
                    name="outDoor-clear"
                    size={25}
                    color={Colors.primary.brand}
                  />
                }
                onBlur={handleBlur('party')}
              />
              <ErrorMessage errorValue={touched.party && errors.party} />

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
