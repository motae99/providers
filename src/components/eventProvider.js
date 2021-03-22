// import React, {useState, Fragment, useRef, useContext} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import Select2 from 'react-native-select-two';

// import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MapView, {Marker} from 'react-native-maps';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Button, Input, CheckBox} from 'react-native-elements';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {Sizing, Outlines, Colors, Typography} from 'styles';

// import Files from 'components/files';
// import FormInput from 'auth/components/formInput';
// import FormButton from 'auth/components/formButton';
// import ErrorMessage from 'auth/components/errorMessage';
// import AddressMap from 'components/address';
// import geohash from 'ngeohash';

// import {UserContext} from 'context/authContext';

// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// import {SafeAreaView} from 'react-native-safe-area-context';
// import {ScrollView} from 'react-native-gesture-handler';
// const {width, height} = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0122;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   logoContainer: {
//     marginBottom: 15,
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     margin: 25,
//   },
//   checkBoxContainer: {
//     backgroundColor: '#fff',
//     borderColor: '#fff',
//   },
// });

// const daysData = [
//   {id: 'Sat', name: 'Sat'}, // set default checked for render option item
//   {id: 'Sun', name: 'Sun'},
//   {id: 'Mon', name: 'Mon'},
//   {id: 'Tue', name: 'Tue'},
//   {id: 'Wen', name: 'Wen'},
//   {id: 'Fri', name: 'Fri'},
// ];

// const validationSchema = Yup.object().shape({
//   address: Yup.string()
//     .label('Full address')
//     .required()
//     .min(10, 'Must have at least 10 characters'),
//   capacity: Yup.number()
//     .label('capacity')
//     .required('capacity of your place')
//     .min(50)
//     .max(1000),
//   workingDays: Yup.array()
//     .of(Yup.string())
//     .required('Required your working Days'),
//   Evening: Yup.boolean().oneOf([true, false], 'Please check'),
//   Night: Yup.boolean().oneOf([true, false], 'Please check'),
//   eAmount: Yup.number('Number Only'),
//   nAmount: Yup.number('Number Only'),

//   // nAmount: Yup.boolean().when('Night', {
//   //   is: true,
//   //   then: Yup.number().required('Night Amount is required.'),
//   // }),
//   // contactNo: Yup.string()
//   //   .label("contact No")
//   //   .required("Plaese submit comtact info")
//   //   .matches(phoneRegExp, "Phone number is not valid"),
//   // email: Yup.string()
//   //   .label("Email")
//   //   .email("Enter a valid email")
//   //   .required("Please enter a registered email"),
//   // check: Yup.boolean().oneOf([true], "Please check the agreement")
// });

// export default function () {
//   const childRef = useRef();
//   const {User} = useContext(UserContext);

//   if (!User) {
//     // show custom error message to tell user should be loged in
//     // actions.setFieldError('general', error.message);
//     return <Text>Login Plz ya Amouna by adding PartyHall Provider</Text>;
//   }

//   const [perc, setPerc] = useState();
//   const [images, setImages] = useState(null);
//   const [uploadingTotal, setUpladingTotal] = useState(null);
//   const [uploadingProg, setUploadingProg] = useState(null);
//   const [dynamicIndex, setDynamicIndex] = useState(null);

//   const [modal, setModal] = useState(false);
//   const [Address, setAddress] = useState(null);
//   const [geoPoint, setgeoPoint] = useState(null);
//   const [geoHash, setgeoHash] = useState(null);
//   const [coordinate, setcoordinate] = useState(null);
//   const [region, setRegion] = useState(null);
//   const [workingDays, addWorkingDays] = useState([]);
//   const [eBooking, setEBooking] = useState(false);
//   const [nBooking, setNBooking] = useState(false);

//   const uploadPhotoAsync = async (uri, uid) => {
//     const fileExt = uri.split('.').pop();
//     const path = `photos/${uid}/${Date.now()}.${fileExt}`;
//     const putFile = uri.replace('file:///', '/');
//     return new Promise(async (res, rej) => {
//       let upload = storage().ref(path).putFile(putFile);
//       upload.on(
//         storage.TaskEvent.STATE_CHANGED,
//         snapshot => {
//           console.log(snapshot.bytesTransferred);
//           console.log(snapshot.totalBytes);
//           var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
//           setPerc(percentage);
//           if (snapshot.state === storage.TaskState.SUCCESS) {
//             console.log('upload completed ');
//           }
//         },
//         err => {
//           rej(err);
//         },
//         async () => {
//           const url = await storage().ref(path).getDownloadURL();
//           res(url);
//         },
//       );
//     });
//   };

//   const handleonAdd = async (values, actions) => {
//     console.log(values);

//     const {
//       workingDays,
//       address,
//       capacity,
//       nAmount,
//       eAmount,
//       Night,
//       Evening,
//     } = values;
//     try {
//       if (!Night && !Evening) {
//         // show custom error message to tell images must be added
//         console.log('eather required');
//         actions.setFieldError('NightEvening', 'One must be set');

//         return actions.setSubmitting(false);
//       }

//       if (Evening && eAmount == '') {
//         // show custom error message to tell images must be added
//         actions.setFieldError(
//           'eAmount',
//           'Eveing is selected but amount is not set',
//         );
//         actions.setSubmitting(false);
//         return null;
//       }
//       if (Night && nAmount == '') {
//         // show custom error message to tell images must be added
//         actions.setFieldError(
//           'nAmount',
//           'Night is selected but amount is not set',
//         );
//         actions.setSubmitting(false);
//         return null;
//       }

//       if (!coordinate) {
//         // show custom error message to tell images must be added

//         actions.setFieldError('corrdinates', 'Pick your location');
//         actions.setSubmitting(false);
//         return null;
//       }

//       if (images) {
//         setUpladingTotal(images.length);

//         for (let i = 0; i < images.length; i++) {
//           const image = images[i];
//           setUploadingProg(i);
//           setDynamicIndex(i);
//           childRef.current.downButtonHandler();
//           var remoteUri = await uploadPhotoAsync(image.uri, User.uid);
//           let localImages = [...images];
//           image.uri = remoteUri;
//           localImages[i] = image;
//           setImages(images);
//           setUploadingProg(i);
//         }
//         setUploadingProg(null);
//       } else {
//         // show custom error message to tell images must be added
//         actions.setFieldError('images', 'Pick your images');
//         actions.setSubmitting(false);
//         return null;
//       }

//       const providerData = {
//         workingDays,
//         address,
//         capacity,
//         nAmount,
//         eAmount,
//         Night,
//         Evening,
//         files: images,
//       };

//       await firestore()
//         .collection('Providers')
//         .doc(User.uid)
//         .update(providerData);
//       // this.props.navigation.navigate('ProviderHome')

//       actions.resetForm({});
//       actions.setStatus({success: true});
//       // navigate('Info');
//     } catch (error) {
//       console.log(error);
//       actions.setFieldError('general', error.message);
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   const handleAddress = address => {
//     console.log(address);
//     const geoPoint = new firestore.GeoPoint(
//       address.latitude,
//       address.longitude,
//     );
//     var coordinate = {
//       latitude: address.latitude,
//       longitude: address.longitude,
//     };
//     var hash = geohash.encode(address.latitude, address.longitude);
//     setAddress(address.address);
//     setgeoHash(hash);
//     setcoordinate(coordinate);
//     setgeoPoint(geoPoint);
//     setRegion({
//       latitude: address.latitude,
//       longitude: address.longitude,
//       // latitudeDelta: address.latitudeDelta,
//       // longitudeDelta: address.longitudeDelta,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
//     });
//   };

//   const renderModal = () => {
//     return (
//       <Modal
//         animationType={'slide'}
//         transparent={false}
//         visible={modal}
//         onRequestClose={() => setModal(false)}>
//         <AddressMap
//           closeModal={() => setModal(false)}
//           notifyChange={address => {
//             handleAddress(address);
//           }}
//         />
//       </Modal>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView style={{marginHorizontal: 10, marginTop: 20}}>
//         <Formik
//           initialValues={{
//             workingDays: '',
//             address: '',
//             capacity: '',
//             Evening: false,
//             Night: false,
//             eAmount: '',
//             nAmount: '',
//           }}
//           onSubmit={(values, actions) => {
//             handleonAdd(values, actions);
//           }}
//           validationSchema={validationSchema}>
//           {({
//             handleChange,
//             values,
//             handleSubmit,
//             errors,
//             isValid,
//             touched,
//             handleBlur,
//             isSubmitting,
//             setFieldValue,
//           }) => (
//             <Fragment>
//               <View style={{backgroundColor: 'white'}}>
//                 <Select2
//                   isSelectSingle={false}
//                   style={{borderRadius: 5, height: 40}}
//                   popupTitle="Week Days"
//                   title="Working Days"
//                   listEmptyTitle="Pick your Days"
//                   // defaultFontName=''
//                   selectedTitleStyle={{color: Colors.primary.brand}}
//                   buttonTextStyle={{color: Colors.primary.brand}}
//                   buttonStyle={{borderRadius: 5}}
//                   colorTheme={Colors.secondry.brand}
//                   cancelButtonText="Cancal"
//                   selectButtonText="Add"
//                   searchPlaceHolderText="Search"
//                   data={daysData}
//                   onSelect={data => {
//                     addWorkingDays(data);
//                     setFieldValue('workingDays', data);
//                   }}
//                   onRemoveItem={data => {
//                     addWorkingDays(data);
//                     setFieldValue('workingDays', data);
//                   }}
//                 />
//               </View>
//               <ErrorMessage
//                 errorValue={touched.workingDays && errors.workingDays}
//               />
//               {coordinate ? (
//                 <View
//                   style={{
//                     height: 200,
//                     borderRadius: 8,
//                     borderColor: Colors.secondry.brand,
//                     borderWidth: 1,
//                     justifyContent: 'center',
//                   }}>
//                   <MapView
//                     style={{
//                       ...StyleSheet.absoluteFillObject,
//                       borderRadius: 8,
//                     }}
//                     scrollEnabled={false}
//                     zoomEnabled={false}
//                     pitchEnabled={false}
//                     rotateEnabled={false}
//                     initialRegion={region}>
//                     <Marker
//                       title={'Found Address'}
//                       description={Address}
//                       coordinate={coordinate}
//                     />
//                   </MapView>

//                   <TouchableOpacity
//                     style={{position: 'absolute', top: 10, right: 10}}
//                     onPress={() => setModal(true)}>
//                     <MIcon
//                       name="crosshairs-gps"
//                       size={35}
//                       color={Colors.primary.brand}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <View
//                   style={{
//                     backgroundColor: Colors.secondry.brand,
//                     height: 200,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderRadius: 8,
//                   }}>
//                   <TouchableOpacity onPress={() => setModal(true)}>
//                     <MIcon
//                       name="map-search-outline"
//                       size={100}
//                       color={Colors.primary.brand}
//                     />
//                   </TouchableOpacity>

//                   <ErrorMessage errorValue={errors.corrdinates} />
//                 </View>
//               )}
//               <FormInput
//                 name="address"
//                 value={values.address}
//                 onChangeText={handleChange('address')}
//                 placeholder="Enter your address"
//                 leftIcon={
//                   <Entypo
//                     name="address"
//                     size={25}
//                     color={Colors.primary.brand}
//                   />
//                 }
//                 onBlur={handleBlur('address')}
//               />
//               <ErrorMessage errorValue={touched.address && errors.address} />

//               <FormInput
//                 name="capacity"
//                 keyboardType="number-pad"
//                 value={values.capacity}
//                 onChangeText={handleChange('capacity')}
//                 placeholder="Place capacity"
//                 leftIcon={
//                   <MIcon
//                     name="table-column-width"
//                     size={25}
//                     color={Colors.primary.brand}
//                   />
//                 }
//                 onBlur={handleBlur('capacity')}
//               />
//               <ErrorMessage errorValue={touched.capacity && errors.capacity} />

//               <View style={{justifyContent: 'center'}}>
//                 <CheckBox
//                   containerStyle={{
//                     backgroundColor: '#fff',
//                     borderColor: '#fff',
//                     borderRadius: 5,
//                     width: '100%',
//                   }}
//                   checkedIcon={
//                     <Fontisto
//                       name="day-haze"
//                       size={25}
//                       color={Colors.secondry.brand}
//                     />
//                   }
//                   day-sunny
//                   // iconType="material"
//                   uncheckedIcon={
//                     <Fontisto name="day-sunny" size={25} color="#f9c22e" />
//                   }
//                   title="Evening Booking"
//                   checkedTitle="Set Price"
//                   checked={values.Evening}
//                   onPress={() => {
//                     setFieldValue('Evening', !values.Evening);
//                     if (eBooking) {
//                       setEBooking(false);
//                       setFieldValue('eAmount', '');
//                     } else {
//                       setEBooking(true);
//                     }
//                   }}
//                 />
//                 <View
//                   style={{
//                     position: 'absolute',
//                     right: 5,
//                     width: width / 2,
//                     opacity: eBooking ? 1 : 0,
//                   }}>
//                   <Input
//                     disabled={!eBooking}
//                     placeholder="المبلغ"
//                     keyboardType="number-pad"
//                     leftIcon={
//                       <Ionicons
//                         name="ios-pricetags"
//                         size={25}
//                         color={Colors.primary.brand}
//                       />
//                     }
//                     // style={{fontFamily: StyleGuide.fontFamily}}
//                     value={values.eAmount}
//                     onChangeText={handleChange('eAmount')}
//                     errorStyle={{color: 'red'}}
//                     // errorMessage="ENTER A VALID ERROR HERE"
//                   />
//                   <ErrorMessage errorValue={errors.eAmount} />
//                 </View>
//               </View>

//               <View style={{justifyContent: 'center'}}>
//                 <CheckBox
//                   containerStyle={{
//                     backgroundColor: '#fff',
//                     borderColor: '#fff',
//                     borderRadius: 5,
//                     width: '100%',
//                   }}
//                   checkedIcon={
//                     <MIcon
//                       name="weather-night"
//                       size={25}
//                       color={Colors.primary.brand}
//                     />
//                   }
//                   day-sunny
//                   // iconType="material"
//                   uncheckedIcon={
//                     <Fontisto name="night-clear" size={25} color="#5d576b" />
//                   }
//                   title="Night Booking"
//                   checkedTitle="Set Price"
//                   checked={values.Night}
//                   onPress={() => {
//                     setFieldValue('Night', !values.Night);
//                     if (nBooking) {
//                       setNBooking(false);
//                       setFieldValue('nAmount', '');
//                     } else {
//                       setNBooking(true);
//                     }
//                   }}
//                 />
//                 <ErrorMessage errorValue={errors.NightEvening} />

//                 <View
//                   style={{
//                     position: 'absolute',
//                     right: 5,
//                     width: width / 2,
//                     opacity: nBooking ? 1 : 0,
//                   }}>
//                   <Input
//                     disabled={!nBooking}
//                     placeholder="Amount"
//                     keyboardType="number-pad"
//                     leftIcon={
//                       <Ionicons
//                         name="ios-pricetags"
//                         size={25}
//                         color={Colors.primary.brand}
//                       />
//                     }
//                     style={styles}
//                     value={values.nAmount}
//                     onChangeText={handleChange('nAmount')}
//                     errorStyle={{color: 'red'}}
//                     // errorMessage="ENTER A VALID ERROR HERE"
//                   />
//                   <ErrorMessage errorValue={errors.nAmount} />
//                 </View>
//               </View>

//               <Files
//                 ref={childRef}
//                 {...{
//                   perc,
//                   uploadingProg,
//                   uploadingTotal,
//                   dynamicIndex,
//                   images,
//                   setImages,
//                 }}
//               />
//               <ErrorMessage errorValue={errors.images} />

//               <View>
//                 <FormButton
//                   buttonType="outline"
//                   onPress={handleSubmit}
//                   title="ADD Provider"
//                   buttonColor={Colors.primary.brand}
//                   disabled={!isValid || isSubmitting}
//                   loading={isSubmitting}
//                 />
//               </View>
//               <ErrorMessage errorValue={errors.general} />
//             </Fragment>
//           )}
//         </Formik>
//       </ScrollView>
//       {renderModal()}
//     </SafeAreaView>
//   );
// }
