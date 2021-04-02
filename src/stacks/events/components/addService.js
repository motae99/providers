import React, {Fragment, useContext} from 'react';
import {StyleSheet, TextInput, View, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from 'components/formInput';
import FormButton from 'components/formButton';

import ErrorMessage from 'components/errorMessage';
import {ProviderContext} from 'context/providerContext';

export const ADD_SERVICE_HEIGHT = 290;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    // height: ADD_SERVICE_HEIGHT,
  },
  name: {
    flexDirection: 'row',
  },
  pointsContainer: {
    borderRadius: 25,
    // backgroundColor: '#44c282',
    padding: 5,
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
  textAreaContainer: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },
});

const validationSchema = Yup.object().shape({
  price: Yup.number()
    .label('price')
    .required('Required Field')
    .min(50)
    .max(10000),
  description: Yup.string().min(4, 'Must have at least 4 characters'),
  serviceName: Yup.string()
    .label('serviceName Name')
    .required('Required Field')
    .min(4, 'Must have at least 4 characters'),
});

export default ({service}) => {
  const {eventProvider} = useContext(ProviderContext);

  const handleonAdd = async (values, actions) => {
    const arrayUnion = firestore.FieldValue.arrayUnion(`${service}`);
    const {serviceName, price, description} = values;

    try {
      await firestore()
        .collection('eventProviders')
        .doc(`${eventProvider.ownerId}`)
        .update({
          ['services']: arrayUnion,
        });

      await firestore()
        .collection('eventProviders')
        .doc(`${eventProvider.ownerId}`)
        .collection(`${service}`)
        .add({name: serviceName, price, description, timestamp: Date.now()});

      actions.resetForm({});
      actions.setStatus({success: true});
    } catch (error) {
      console.log(error);
      actions.setFieldError('general', error.message);
      actions.setErrors({submit: error.message});
      actions.setStatus({success: false});
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        serviceName: '',
        price: '',
        description: '',
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
          <View style={[styles.container]}>
            <View style={styles.name}>
              <View style={{flex: 2, marginRight: 10}}>
                <FormInput
                  name="serviceName"
                  value={values.serviceName}
                  onChangeText={handleChange('serviceName')}
                  placeholder="Add new"
                  onBlur={handleBlur('serviceName')}
                />
                <ErrorMessage
                  errorValue={touched.newService && errors.newService}
                />
              </View>
              <View style={{flex: 1}}>
                <FormInput
                  name="newService"
                  keyboardType="number-pad"
                  value={values.price}
                  onChangeText={handleChange('price')}
                  placeholder="price"
                  onBlur={handleBlur('newService')}
                />
                <ErrorMessage errorValue={touched.price && errors.price} />
              </View>
            </View>

            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Descripe the service"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                name="description"
                value={values.description}
                onChangeText={handleChange('description')}
              />
              <ErrorMessage
                errorValue={touched.description && errors.description}
              />
            </View>

            <View style={styles.pointsContainer}>
              <FormButton
                style={{width: '100%'}}
                buttonType="outline"
                onPress={handleSubmit}
                title="ADD"
                buttonColor="#219CAB"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
              <ErrorMessage errorValue={errors.general} />
            </View>
          </View>
        </Fragment>
      )}
    </Formik>
  );
};
