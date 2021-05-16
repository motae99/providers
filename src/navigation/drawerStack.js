/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
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

import Tabs from 'navigation/tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import ProfileImage from 'components/profileImage';
import {Sizing, Outlines, Colors, Typography} from 'styles';

import {AuthContext} from 'context/authContext';

function CustomDrawerContent({progress, ...rest}) {
  const {signOut, dbUser} = useContext(AuthContext);
  const ripple = TouchableNativeFeedback.Ripple('#55DAEA', false);

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [300, 0],
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
          transform: [{translateX}],
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
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerStyle={{
        backgroundColor: '#F8F8FD',
        width: 320,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}
