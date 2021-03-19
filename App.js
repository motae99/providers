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
          backgroundColor: 'green',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>
          Update Now this is a simple fix for now
        </Text>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
