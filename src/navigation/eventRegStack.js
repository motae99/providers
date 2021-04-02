import React from 'react';
// import {enabledScreens} from 'react-native-screens';
// import {createStackNavigator} from '@react-navigation/stack';
import ProviderContextProvider from 'context/providerContext';

import Tabs from 'navigation/tabs';
// enabledScreens();

const EventStack = () => {
  return (
    <ProviderContextProvider>
      <Tabs />
    </ProviderContextProvider>
  );
};

export default EventStack;
