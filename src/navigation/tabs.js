import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProviderContextProvider from 'context/providerContext';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Colors} from 'styles';
import MyTabBar from 'navigation/components/tabBar';

import Booking from 'stacks/booking';
import Social from 'stacks/social';
import Offers from 'stacks/offer';
import Payments from 'stacks/payments';
import Profile from 'stacks/offer';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Booking"
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        activeTintColor: Colors.primary.brand,
      }}>
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarLabel: 'Social',
          iconName: 'copy',
          activeColor: Colors.primary.brand,
          inActiveColor: Colors.secondary.s200,
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarLabel: 'Offers',
          iconName: 'activity',
          activeColor: Colors.primary.brand,
          inActiveColor: Colors.secondary.s200,
        }}
      />

      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarLabel: 'Payments',
          iconName: 'edit-3',
          activeColor: Colors.primary.brand,
          inActiveColor: Colors.secondary.s200,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          iconName: 'user',
          activeColor: Colors.primary.brand,
          inActiveColor: Colors.secondary.s200,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
