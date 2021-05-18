import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from 'context/authContext';
import * as geofirestore from 'geofirestore';

import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const GeoFirestore = geofirestore.initializeApp(firestore());

export const ProviderContext = createContext();

const ProviderContextProvider = props => {
  const {dbUser} = React.useContext(AuthContext);

  const imagesRef = useRef();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState(null);
  const [indexArry, setIndexArry] = useState([]);
  const [perc, setPerc] = useState();
  const [images, setImages] = useState(null);
  const [uploadingTotal, setUpladingTotal] = useState(null);
  const [uploadingProg, setUploadingProg] = useState(null);
  const [dynamicIndex, setDynamicIndex] = useState(null);
  const [modals, setModal] = useState(false);
  const [Address, setAddress] = useState('');
  const [coordinate, setcoordinate] = useState(null);
  const [region, setRegion] = useState(null);
  const [query, setQuery] = useState(null);
  const [geoRef, setGeoRef] = useState(null);
  const [servicesQuery, setServicesQuery] = useState(null);

  useMemo(() => {
    if (dbUser.serviceType === 'Events') {
      const providerquery = firestore()
        .collection('eventProviders')
        .doc(dbUser?.uid);
      const service = firestore().collection('eventServices');
      const geocollection = GeoFirestore.collection('eventProviders');
      setQuery(providerquery);
      setGeoRef(geocollection);
      setServicesQuery(service);
    }

    if (dbUser.serviceType === 'Photography') {
      const providerquery = firestore()
        .collection('photoProviders')
        .doc(dbUser?.uid);
      const service = firestore().collection('photoServices');
      const geocollection = GeoFirestore.collection('photoProviders');
      setGeoRef(geocollection);
      setQuery(providerquery);
      setServicesQuery(service);
    }

    if (dbUser.serviceType === 'EventPlanner') {
      const providerquery = firestore()
        .collection('eventPlannerProviders')
        .doc(dbUser?.uid);
      const service = firestore().collection('eventPlannerServices');
      const geocollection = GeoFirestore.collection('eventPlannerProviders');
      setGeoRef(geocollection);
      setQuery(providerquery);
      setServicesQuery(service);
    }
  }, [dbUser]);

  useEffect(() => {
    const subscriber = servicesQuery
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const service = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (service && service.length > 0) {
            // console.log(services);
            setServices(service);
          }
        }
      });

    return () => subscriber();
  }, [servicesQuery]);

  useEffect(() => {
    const subscriber = query.onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists) {
        setProvider(documentSnapshot.data());
      } else {
        setProvider(null);
      }
    });
    return () => subscriber();
  }, [query]);

  const handleAddress = address => {
    var coordinates = {
      latitude: address.latitude,
      longitude: address.longitude,
    };
    setAddress(address.address);
    setcoordinate(coordinates);
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
    const path = `providers/${
      dbUser.serviceType
    }/${uid}/${Date.now()}.${fileExt}`;
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
    console.log('downButton is working', dynamicIndex);
    imagesRef?.current?.scrollTo({
      x: dynamicIndex,
      y: 0,
      animated: true,
    });
  };

  const updateUserPhoto = async photoPath => {
    // console.log(photoPath);
    try {
      await uploadPhotoAsync(photoPath, dbUser.uid)
        .then(remoteUri => {
          query.update({photoURL: remoteUri});
          firestore()
            .collection('providers')
            .doc(dbUser?.uid)
            .update({photoURL: remoteUri});
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
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
        provider,
        services,
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
        coordinate,
        region,
        handleAddress,
        geoRef,
        query,
        updateUserPhoto,
      }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default ProviderContextProvider;
