/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import AuthStack from 'navigation/authStack';
import AppStack from 'navigation/appStack';

import AuthContextProvider from 'context/authContext';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const Navigator = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [User, setUser] = React.useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    // We haven't finished checking for the token yet
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text> SplashScreen </Text>
      </View>
    );
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        {User ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default Navigator;
