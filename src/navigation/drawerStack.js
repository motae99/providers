/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Facebook from 'components/buttons/facebook';
import Google from 'components/buttons/google';
import Phone from 'components/buttons/phone';
import Animated from 'react-native-reanimated';
import ProfileImage from 'components/profileImage';
import {Sizing, Outlines, Colors, Typography} from 'styles';

import HomeStack from 'navigation/homeStack';
import {AuthContext} from 'context/authContext';

function Language() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Language Screen</Text>
    </View>
  );
}

function Vouchers() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vouchers Screen</Text>
    </View>
  );
}

function CustomDrawerContent({progress, ...rest}) {
  const {signOut, dbUser} = React.useContext(AuthContext);
  const ripple = TouchableNativeFeedback.Ripple('#55DAEA', false);

  const translateY = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [900, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Image
        style={[StyleSheet.absoluteFillObject]}
        source={require('img/events.jpeg')}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 100,
          alignSelf: 'center',
        }}>
        <ProfileImage />
      </View>
      <Animated.View
        style={{
          transform: [{translateY}],
          marginTop: 150,
          paddingTop: 150,
          borderTopLeftRadius: 60,
          backgroundColor: '#F8F8FD',
        }}>
        <Text
          style={{
            ...Typography.header.x40,
            position: 'absolute',
            top: 100,
            alignSelf: 'center',
            color: Colors.neutral.s600,
          }}>
          {dbUser.displayName}
        </Text>

        <DrawerItemList
          {...rest}
          itemStyle={{backgroundColor: 'white', borderRadius: 10}}
        />

        {/* <DrawerItem
        label="Privacy & Policy"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      /> */}

        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback
            background={ripple}
            onPress={() => signOut()}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Icon
                name="wallet"
                type="simple-line-icon"
                size={20}
                color={'black'}
                style={{marginRight: 15}}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Wallet
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <Facebook />
        <Google />
        <Phone {...rest} />

        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback
            background={ripple}
            onPress={() => signOut()}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Icon
                name="logout"
                type="simple-line-icon"
                size={20}
                color={'black'}
                style={{marginRight: 15}}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  const {dbUser, signOut} = React.useContext(AuthContext);
  if (!dbUser) {
    // signOut();
    return (
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>Data Base user not ready</Text>
      </View>
    );
  }
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerStyle={{
        backgroundColor: '#F8F8FD',
        width: 320,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      {/* <Drawer.Screen name="Language" component={Language} />
      <Drawer.Screen name="Vouchers" component={Vouchers} /> */}
    </Drawer.Navigator>
  );
}

// class CustomDrawerContentComponent extends Component {
//   render() {
//     const { theme, user } = this.props;
//     const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

//     return (
//       <View style={{ flex: 1 }}>

//         <ScrollView>
//           <SafeAreaView
//             style={styles.container}
//             forceInset={{ top: 'always', horizontal: 'never' }}
//           >
//             <View style={[ styles.containHeader, { backgroundColor: theme.pri700 }]}>
//               <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
//                 <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${user.firstname}`}</Text>
//                 <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${user.email}`}</Text>
//               </View>
//             </View>

//             <DrawerItems {...this.props} />

//             <View>
//               <View style={{ marginTop: '2%' }}>
//                 <Divider style={{ backgroundColor: '#777f7c90' }} />
//               </View>
//               <View style={{ marginTop: '3%' }}>
//                 <ColorPalette />
//               </View>
//               <View style={{ marginTop: '5%' }}>
//                 <Divider style={{ backgroundColor: '#777f7c90' }} />
//               </View>
//             </View>
//           </SafeAreaView>
//         </ScrollView>

//         <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
//           <TouchableNativeFeedback background={ripple}>
//             <View style={styles.containDrawerOption}>
//               <Icon
//                 name='logout'
//                 type='simple-line-icon'
//                 size={20}
//                 color={theme.pri700}
//                 containerStyle={{ marginRight: '10%' }}
//               />
//               <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
//             </View>
//           </TouchableNativeFeedback>

//           <TouchableNativeFeedback background={ripple}>
//             <View style={styles.containDrawerOption}>
//               <Icon
//                 name='user-secret'
//                 type='font-awesome'
//                 size={24}
//                 color={theme.pri700}
//                 containerStyle={{ marginRight: '10%' }}
//               />
//               <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
//             </View>
//           </TouchableNativeFeedback>
//         </View>

//       </View>
//     );
//   }
// }
