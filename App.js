/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Navigator from 'navigation';
import Services from 'utils/services';
import Payments from 'stacks/payments';
import {Reflectly, ColorSelection} from 'stacks/tabs';

// import codePush from 'react-native-code-push';
// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

const App = ({props}) => {
  return (
    <SafeAreaProvider>
      <Services />
      <Navigator />
      {/* <Payments /> */}
      {/* <ColorSelection /> */}
      {/* <Reflectly /> */}
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>
          Update Now this is a simple fix for now
        </Text>
      </View> */}

      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default App;

// import React from 'react';
// import {
//   Animated,
//   StatusBar,
//   Dimensions,
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import 'react-native-gesture-handler';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// // Plus...
// import plus from 'assets/img/UserPhoto.jpeg';
// import Svg, {Path} from 'react-native-svg';

// // Font Awesome Icons...
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {useRef} from 'react';

// const Tab = createBottomTabNavigator();

// // Hiding Tab Names...
// export default function App() {
//   // Animated Tab Indicator...
//   const tabOffsetValue = useRef(new Animated.Value(0)).current;
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBarOptions={{
//           showLabel: false,
//           // Floating Tab Bar...
//           style: {
//             backgroundColor: 'green',
//             // position: 'absolute',
//             // bottom: 40,
//             // marginHorizontal: 20,
//             // Max Height...
//             height: 60,
//             borderRadius: 10,
//             // Shadow...
//             // shadowColor: '#000',
//             // shadowOpacity: 0.06,
//             // shadowOffset: {
//             //   width: 10,
//             //   height: 10,
//             // },
//             // paddingHorizontal: 20,
//           },
//         }}>
//         {
//           // Tab Screens....
//           // Tab ICons....
//         }
//         <Tab.Screen
//           name={'Home'}
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View
//                 style={{
//                   // centring Tab Button...
//                   // position: 'absolute',
//                   // top: 20,
//                   backgroundColor: '#fff',
//                   height: 60,
//                   width: 80,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <FontAwesome5
//                   name="home"
//                   size={20}
//                   color={focused ? 'red' : 'gray'}
//                 />
//               </View>
//             ),
//           }}
//           listeners={({navigation, route}) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: 0,
//                 useNativeDriver: true,
//               }).start();
//             },
//           })}
//         />

//         <Tab.Screen
//           name={'Search'}
//           component={SearchScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View
//                 style={{
//                   // centring Tab Button...
//                   // position: 'absolute',
//                   // top: 20,
//                   backgroundColor: '#fff',
//                   height: 60,
//                   width: 74,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <FontAwesome5
//                   name="search"
//                   size={20}
//                   color={focused ? 'red' : 'gray'}
//                 />
//               </View>
//             ),
//           }}
//           listeners={({navigation, route}) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth(),
//                 useNativeDriver: true,
//               }).start();
//             },
//           })}
//         />

//         {
//           // Extra Tab Screen For Action Button..
//         }

//         <Tab.Screen
//           name={'ActionButton'}
//           component={EmptyScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View style={{height: 60, width: 100}}>
//                 <View style={StyleSheet.absoluteFill}>
//                   <Svg width={100} height={60} viewBox="0 0 100 60" fill="none">
//                     <Path
//                       d="M74.634 12.735C67.683 23.764 62.804 30.46 47.317 31.38c-15.488.919-20.732-7.615-26.951-18.644C14.146 1.707 0 0 0 0v60h100V0S81.585 1.707 74.634 12.735z"
//                       fill="#fff"
//                     />
//                   </Svg>
//                 </View>
//                 <TouchableOpacity style={{height: 60, width: 100}}>
//                   <View
//                     style={{
//                       width: 50,
//                       height: 50,
//                       backgroundColor: 'red',
//                       borderRadius: 30,
//                       marginLeft: 22,
//                       marginTop: -25,
//                       // borderWidth: 10,
//                       // borderColor: 'transparent',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       // alignSelf: 'center',
//                       marginBottom: 120, //Platform.OS == 'android' ? 50 : 30,
//                     }}>
//                     <Image
//                       source={plus}
//                       style={{
//                         width: 12,
//                         height: 12,
//                         tintColor: 'white',
//                       }}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             ),
//           }}
//         />

//         <Tab.Screen
//           name={'Notifications'}
//           component={NotificationScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View
//                 style={{
//                   // centring Tab Button...
//                   // position: 'absolute',
//                   // top: 20,
//                   backgroundColor: '#fff',
//                   height: 60,
//                   width: 75,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <FontAwesome5
//                   name="bell"
//                   size={20}
//                   color={focused ? 'red' : 'gray'}
//                 />
//               </View>
//             ),
//           }}
//           listeners={({navigation, route}) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth() * 3,
//                 useNativeDriver: true,
//               }).start();
//             },
//           })}
//         />

//         <Tab.Screen
//           name={'Settings'}
//           component={SettingsScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View
//                 style={{
//                   // centring Tab Button...
//                   // position: 'absolute',
//                   // top: 20,
//                   backgroundColor: '#fff',
//                   height: 60,
//                   width: 80,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <FontAwesome5
//                   name="user-alt"
//                   size={20}
//                   color={focused ? 'red' : 'gray'}
//                 />
//               </View>
//             ),
//           }}
//           listeners={({navigation, route}) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth() * 4,
//                 useNativeDriver: true,
//               }).start();
//             },
//           })}
//         />
//       </Tab.Navigator>

//       {/* <Animated.View
//         style={{
//           width: getWidth(),
//           height: 2,
//           backgroundColor: 'red',
//           position: 'absolute',
//           bottom: 60,
//           // Horizontal Padding = 20...
//           left: 0,
//           borderRadius: 20,
//           transform: [{translateX: tabOffsetValue}],
//         }}
//       /> */}
//     </NavigationContainer>
//   );
// }

// function getWidth() {
//   let width = Dimensions.get('window').width;

//   // Horizontal Padding = 20...
//   width = width - 80;

//   // Total five Tabs...
//   return width / 5;
// }

// function EmptyScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'green',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     />
//   );
// }

// function SettingsScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'green',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function HomeScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'green',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function NotificationScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'green',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// function SearchScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Search!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
