/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeModules,
} from 'react-native';
import {Sizing, Outlines, Colors} from 'styles';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
// import * as ImagePicker from 'react-native-image-picker';
import {AuthContext} from 'context/authContext';
import {ProviderContext} from 'context/providerContext';
var ImagePicker = NativeModules.ImageCropPicker;

const {width, height} = Dimensions.get('window');
const containerSize = height / 5;
const imageSize = containerSize - Sizing.x10;

const ProfileImage = ({response, setResponse}) => {
  const {dbUser} = React.useContext(AuthContext);
  const {updateUserPhoto} = React.useContext(ProviderContext);

  const [edit, setEdited] = React.useState(null);
  const [userImage, setUserImage] = React.useState(dbUser?.photoURL);

  // const updateImage = async selectedImage => {
  //   console.log('cropRect', selectedImage.path);
  //   // const profileImage = await Storage(photoURL, user.uid);
  // };
  return (
    <>
      <View
        elevation={90}
        style={{
          height: containerSize,
          width: containerSize,
          borderRadius: containerSize,
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: Colors.neutral.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <FastImage
          style={StyleSheet.absoluteFillObject}
          source={{
            uri: {require('img/profilePlaceholder.png')},
            priority: FastImage.priority.normal,
            cashe: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        /> */}
        <TouchableOpacity
          onPress={() => {
            return ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              updateUserPhoto(image.path);
            });
          }}>
          <Image
            source={
              userImage
                ? {uri: userImage}
                : require('img/profilePlaceholder.png')
            }
            style={{
              height: imageSize,
              width: imageSize,
              borderRadius: imageSize,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>

        <View
          elevation={100}
          style={{
            height: 36, //Sizing.icons.x40,
            width: 36, //Sizing.icons.x40,
            borderRadius: 7, //Outlines.borderRadius.small,
            position: 'absolute',
            bottom: -20,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather name="camera" color={Colors.primary.brand} size={25} />
        </View>
      </View>
    </>
  );
};
export default ProfileImage;
