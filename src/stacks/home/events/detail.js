// /* eslint-disable no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */
// import * as React from 'react';
// import {
//   Text,
//   View,
//   Dimensions,
//   StatusBar,
//   Animated,
//   ScrollView,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MapView, {Marker} from 'react-native-maps';
// import * as Animatable from 'react-native-animatable';

// import HeaderImage from './components/headerImage';
// import Header from './components/detailHeader';

// export const {width, height} = Dimensions.get('window');

// const region = {
//   latitude: 17.441549,
//   longitude: 78.489381,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };

// // const headerHieght = height / 6;

// export const MIN_HEADER_HEIGHT = 100;
// export const HEADER_IMAGE_HEIGHT = height * 0.65;
// const ICON_SIZE = 20;
// const PADDING = 18;
// const fadeIn = {
//   0: {
//     opacity: 0,
//     translateY: 100,
//   },
//   1: {
//     opacity: 1,
//     translateY: 0,
//   },
// };

// const Detail = ({navigation, route}) => {
//   const {selectedItem, selectedImageIndex} = route.params;
//   const scrollY = React.useRef(new Animated.Value(0)).current;
//   const list = React.useRef();

//   const scrollBack = () => {
//     list.current.scrollToIndex({
//       animated: true,
//       index: 0,
//     });
//   };
//   const opacity = scrollY.interpolate({
//     inputRange: [0, HEADER_IMAGE_HEIGHT * 0.7],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });
//   return (
//     <View style={{backgroundColor: '#fff', flex: 1}}>
//       <StatusBar
//         // translucent
//         barStyle={'light-content'}
//         // backgroundColor="transparent"
//       />
//       {/* <Image
//         source={require('../../../../assets/img/photography.jpeg')}
//         style={[StyleSheet.absoluteFillObject, {resizeMode: 'stretch'}]}
//         blurRadius={90}
//       /> */}
//       <HeaderImage
//         navigation={navigation}
//         route={route}
//         animatedValue={scrollY}
//         {...{list}}
//       />
//       <Header
//         navigation={navigation}
//         route={route}
//         animatedValue={scrollY}
//         name={selectedItem.name}
//         list={list}
//       />

//       <ScrollView
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {y: scrollY}}}],
//           {useNativeDriver: false},
//         )}
//         contentContainerStyle={{paddingHorizontal: 18}}>
//         <View
//           style={{
//             height: HEADER_IMAGE_HEIGHT,
//             marginBottom: 18,
//           }}
//         />
//         <Animatable.View
//           animation={fadeIn}
//           delay={700}
//           duration={400}
//           useNativeDriver={true}>
//           <Animated.View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               // alignItems: 'center',
//               opacity,
//               marginTop: PADDING * 2,
//               marginBottom: 16,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Ionicons name="md-location-outline" size={18} color="#2B3449" />
//               <Text
//                 style={{
//                   fontFamily: 'Montserrat',
//                   fontSize: 10,
//                   fontWeight: '400',
//                   color: 'rgba(43,52,73,1)',
//                   paddingLeft: 4,
//                 }}>
//                 {selectedItem.address}
//               </Text>
//             </View>

//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <FontAwesome name="star" size={18} color="#219CAB" />
//               <Text
//                 style={{
//                   fontFamily: 'Montserrat',
//                   fontSize: 10,
//                   fontWeight: '400',
//                   color: 'rgba(43,52,73,1)',
//                   paddingLeft: 4,
//                 }}>
//                 {selectedItem.rate}(2.2K review)
//               </Text>
//             </View>
//           </Animated.View>
//         </Animatable.View>

//         <View>
//           <Animatable.View
//             animation={'fadeInUp'}
//             delay={1100}
//             duration={400}
//             useNativeDriver={true}>
//             <Text
//               style={{
//                 fontFamily: 'Montserrat',
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginBottom: 18,
//               }}>
//               Get Directions
//             </Text>
//             <View
//               style={{
//                 borderRadius: 16,
//                 overflow: 'hidden',
//                 height: height / 5,
//               }}>
//               <MapView
//                 style={{
//                   flex: 1,
//                 }}
//                 scrollEnabled={false}
//                 zoomEnabled={false}
//                 pitchEnabled={false}
//                 rotateEnabled={false}
//                 initialRegion={region}>
//                 <Marker
//                   title={'paryHall name'}
//                   description={'partyHall address'}
//                   coordinate={region}
//                 />
//               </MapView>
//             </View>
//           </Animatable.View>
//           <View style={{width, height}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// Detail.sharedElements = (route, otherRoute, showing) => {
//   const {selectedItem} = route.params;
//   return selectedItem.files.map(
//     (item) => `item.${selectedItem.key}.image.${item.key}`,
//   );
// };

// export default Detail;

import React from 'react';
import {View} from 'react-native';
export default function () {
  return <View style={{flex: 1, backgroundColor: 'red'}} />;
}
