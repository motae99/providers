import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import Phone from 'auth/phone';
import Login from 'auth/login';
import Introd from 'auth/introd';
import SignUp from 'auth/signUp';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Introd" component={Introd} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
