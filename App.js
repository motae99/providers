/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Navigator from 'navigation';
import Services from 'utils/services';
import Payments from 'stacks/payments';
import Tabs from 'stacks/tabs';
import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

import {Constants} from 'react-native-unimodules';

const App = ({props}) => {
  console.log(Constants.systemFonts);

  return (
    <SafeAreaProvider>
      {/* <Services />
      <Navigator /> */}
      {/* <Tabs /> */}
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
