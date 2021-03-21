import React from 'react';
import storage from '@react-native-firebase/storage';
// import {AuthContext} from 'context/authContext';

const uploadPhotoAsync = async (uri, uid) => {
  // const {setUploadProgress} = React.useContext(AuthContext);

  const fileExt = uri.split('.').pop();

  const path = `photos/${uid}/${Date.now()}.${fileExt}`;
  console.log('this is our storage path', path);
  const putFile = uri.replace('file:///', '/');

  return new Promise(async (res, rej) => {
    // let upload = storage().ref(path).putFile(putFile);
    console.log('start uploading to storage');
    let upload = storage().ref(path).putFile(uri);
    upload.on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // console.log(snapshot.bytesTransferred);
        // console.log(snapshot.totalBytes);
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
        // console.log('current percentage', percentage);
        // setUploadProgress(percentage);
        // if (snapshot.state === storage.TaskState.SUCCESS) {
        //   console.log('upload completed ');
        // }
      },
      (err) => {
        rej(err);
      },
      async () => {
        const url = await storage().ref(path).getDownloadURL();
        res(url);
      },
    );
  });
};
export default uploadPhotoAsync;
