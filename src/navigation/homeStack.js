import React from 'react';
import {enabledScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';

import EventProvider from 'stacks/providers/event';
import PhotoProvider from 'stacks/providers/photo';
import EventServices from 'stacks/events/eventServices';
import Unverified from 'components/unverified';

import Phone from 'auth/phone';
// enabledScreens();
const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Phone" component={Phone} />
    </Stack.Navigator>
  );
};

export const AddProvider = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="PhotoProvider" component={PhotoProvider} />
      <Stack.Screen name="EventProvider" component={EventProvider} />
    </Stack.Navigator>
  );
};

export const AddServices = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="EventServices" component={EventServices} />
      <Stack.Screen name="Unverified" component={Unverified} />
    </Stack.Navigator>
  );
};
