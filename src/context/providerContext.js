import React, {createContext, useState, useRef, useEffect} from 'react';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import geohash from 'ngeohash';
// import Storage from 'api/storage';
import storage from '@react-native-firebase/storage';
import {AuthContext} from 'context/authContext';

import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;

export const ProviderContext = createContext();

const ProviderContextProvider = props => {
  const {dbUser} = React.useContext(AuthContext);

  const imagesRef = useRef();
  const [eventProvider, setEventProvider] = useState(null);
  const [eventServices, setEventServices] = useState(null);
  const [indexArry, setIndexArry] = useState([]);
  const [perc, setPerc] = useState();
  const [images, setImages] = useState(null);
  const [uploadingTotal, setUpladingTotal] = useState(null);
  const [uploadingProg, setUploadingProg] = useState(null);
  const [dynamicIndex, setDynamicIndex] = useState(null);
  const [modals, setModal] = useState(false);
  const [Address, setAddress] = useState('');
  const [geoPoint, setgeoPoint] = useState(null);
  const [geoHash, setgeoHash] = useState(null);
  const [coordinate, setcoordinate] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventServices')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const services = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (services && services.length > 0) {
            // console.log(services);
            setEventServices(services);
          }
        }
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventProviders')
      .doc(dbUser?.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User data: ', documentSnapshot.data());
          setEventProvider(documentSnapshot.data());
        } else {
          setEventProvider(null);
        }
      });
    return () => subscriber();
  }, [dbUser]);

  const handleAddress = address => {
    console.log(address);
    const geoPoints = new firestore.GeoPoint(
      address.latitude,
      address.longitude,
    );
    var coordinates = {
      latitude: address.latitude,
      longitude: address.longitude,
    };
    var hash = geohash.encode(address.latitude, address.longitude);
    setAddress(address.address);
    setgeoHash(hash);
    setcoordinate(coordinates);
    setgeoPoint(geoPoints);
    setRegion({
      latitude: address.latitude,
      longitude: address.longitude,
      // latitudeDelta: address.latitudeDelta,
      // longitudeDelta: address.longitudeDelta,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
    });
  };

  const uploadPhotoAsync = async (uri, uid) => {
    const fileExt = uri.split('.').pop();
    const path = `providers/events/${uid}/${Date.now()}.${fileExt}`;
    const putFile = uri.replace('file:///', '/');
    return new Promise(async (res, rej) => {
      let upload = storage().ref(path).putFile(putFile);
      upload.on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
          setPerc(percentage);
          if (snapshot.state === storage.TaskState.SUCCESS) {
          }
        },
        err => {
          rej(err);
        },
        async () => {
          const url = await storage().ref(path).getDownloadURL();
          res(url);
        },
      );
    });
  };

  const downButtonHandler = () => {
    console.log('downButton is working');
    imagesRef?.current?.scrollTo({
      x: indexArry[dynamicIndex],
      y: 0,
      animated: true,
    });
  };

  const uploadLoap = async User => {
    setUpladingTotal(images.length);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      setUploadingProg(i);
      setDynamicIndex(i);
      downButtonHandler();
      var remoteUri = await uploadPhotoAsync(image.uri, User.uid);
      let localImages = [...images];
      image.uri = remoteUri;
      localImages[i] = image;
      console.log('images ', images);
      console.log('localImages ', localImages);

      setImages(localImages);
      downButtonHandler();
      setUploadingProg(i);
    }

    setUploadingProg(null);
  };

  return (
    <ProviderContext.Provider
      value={{
        imagesRef,
        eventProvider,
        eventServices,
        uploadLoap,
        indexArry,
        setIndexArry,
        perc,
        images,
        setImages,
        uploadingTotal,
        uploadingProg,
        dynamicIndex,
        modals,
        setModal,
        Address,
        geoPoint,
        geoHash,
        coordinate,
        region,
        handleAddress,
      }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default ProviderContextProvider;
