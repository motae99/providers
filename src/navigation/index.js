/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import AuthStack from 'navigation/authStack';
import DrawerStack from 'navigation/drawerStack';

import AuthContextProvider from 'context/authContext';

const AppStack = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [User, setUser] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
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
        {User ? <DrawerStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default AppStack;
