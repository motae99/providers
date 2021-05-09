/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
// import Navigator from 'navigation';
// import Services from 'utils/services';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = ({props}) => {
  return (
    <SafeAreaProvider>
      {/* <Services /> */}
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
      {/* <Navigator /> */}

      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
