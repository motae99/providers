import React from 'react';
import FastImage from 'react-native-fast-image';
const placeHolder = require('assets/img/UserPhoto.jpeg');
const UserImage = props => {
  return (
    <FastImage
      style={props.style}
      source={
        props.uri
          ? {
              uri: props.uri,
              priority: FastImage.priority.normal,
              cashe: FastImage.cacheControl.immutable,
            }
          : placeHolder
      }
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
export default UserImage;
