/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'context/authContext';

export default () => {
  const {User, dbUser, signOut} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{backgroundColor: '#A5F1FA', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => signOut()}>
          <Text>
            waiting for verifcations {User.displayName}, tab to signOut
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
