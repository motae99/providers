import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProviderContextProvider from 'context/providerContext';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Colors} from 'styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';

import Booking from 'stacks/events/booking';
import Social from 'stacks/social';
import Offers from 'stacks/offer';
import Payments from 'stacks/payments';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Booking"
      tabBarOptions={{
        activeTintColor: Colors.primary.brand,
      }}>
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({color, size}) => (
            <Foundation name="social-treehouse" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="offer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="order-bool-descending-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarLabel: 'Payments',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="offer" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
