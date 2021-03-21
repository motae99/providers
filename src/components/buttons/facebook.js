/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, TouchableNativeFeedback} from 'react-native';
import {AuthContext} from 'context/authContext';
import {Sizing, Outlines, Colors, Typography} from 'styles';

export default function () {
  const ripple = TouchableNativeFeedback.Ripple(Colors.secondary.s200, false);
  const {connectFacebook, dbUser} = React.useContext(AuthContext);

  // console.log('User ', User);
  // console.log('Provider ID', User.providerData);
  // let connected = User?.providerData[1].providerId === 'facebook.com';
  // let displayName = User?.providerData[1].displayName || 'Facebook';

  return (
    <View
      // elevation={6}
      style={{
        backgroundColor: Colors.neutral.white,
        marginHorizontal: Sizing.x10,
        marginVertical: Sizing.x5,
        borderRadius: Outlines.borderRadius.base,
      }}>
      <TouchableNativeFeedback
        background={ripple}
        onPress={() => (dbUser?.facebook ? null : connectFacebook())}>
        <View style={{flexDirection: 'row', padding: Sizing.x10 + Sizing.x5}}>
          <Image
            style={{
              width: Sizing.x20,
              height: Sizing.x20,
              marginRight: Sizing.x10 + Sizing.x5,
              resizeMode: 'contain',
            }}
            source={
              dbUser?.facebook
                ? require('img/facebookColor.png')
                : require('img/facebookBlack.png')
            }
          />
          <Text style={{...Typography.body.x10, color: Colors.neutral.black}}>
            {dbUser?.facebook
              ? dbUser?.facebookProfile.name
              : 'Connect Facebook'}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
