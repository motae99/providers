/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {View, Text} from 'react-native';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = ({props}) => {
  return (
    <SafeAreaProvider>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>Provider App no data</Text>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
