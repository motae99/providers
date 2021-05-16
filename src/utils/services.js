/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from 'navigation';

const Services = () => {
  const [localToken, setLocalToken] = useState(null);

  function handleDynamicLink(link) {
    console.log('link', link);
    const testUrl = 'https://kantaui.page.link/HomeStack/EventList';
    Linking.openURL(testUrl);
  }

  const storageToken = async () => {
    const tokenStorage = await AsyncStorage.getItem('fcmToken')
      .then(token => setLocalToken(token)) //setLocalToken(token)
      .catch(error => console.log(error));
    return tokenStorage;
  };

  storageToken();

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const processNotification = (remoteMessage, fromBackground) => {
    let title = '';
    let body = '';
    let alertBtns = [];

    if (remoteMessage) {
      RootNavigation.navigate('EventList');
      if (remoteMessage.notification) {
        title = remoteMessage.notification.title;
        body = remoteMessage.notification.body;
      }

      if (remoteMessage.data) {
        if (fromBackground && remoteMessage.data.msgType) {
          switch (remoteMessage.data.msgType) {
            case 'Event':
              console.log('you should navigate now to a a page of search');
              return; // terminate the method here

            // More cases in when app get bigger
          }
        }

        if (!fromBackground && remoteMessage.data.msgType) {
          switch (remoteMessage.data.msgType) {
            case 'Search':
              alertBtns = [
                {
                  text: 'View',
                  onPress: () => {
                    console.log(
                      'you should navigate now to a a page of search',
                    );

                    // this.forwardToSearchPage(remoteMessage.data.word);
                  },
                },
                {
                  text: 'Close',
                  onPress: () => console.log('Close Pressed'),
                  style: 'cancel',
                },
              ];
              break;

            // More cases in when app get bigger
          }
        }
      }

      if (!fromBackground) {
        if (title.length > 0 && body.length > 0) {
          Alert.alert(
            title,
            body,
            alertBtns.length > 0 ? alertBtns : undefined,
          );
        }
      }
    }
  };

  useEffect(() => {
    if (!localToken) {
      console.log('we dont have');
      requestUserPermission();
    }

    messaging().onTokenRefresh(async token => {
      await AsyncStorage.setItem('fcmToken', token);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      processNotification(remoteMessage, true);
      //this.forwardToSearchPage(remoteMessage.data.word);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          processNotification(remoteMessage, true);
          // this.forwardToSearchPage(remoteMessage.data.word);
        }
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      processNotification(remoteMessage, true);
      // this.forwardToSearchPage(remoteMessage.data.word);
    });
    return () => unsubscribe();
  }, [localToken]);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          handleDynamicLink(link);
        }
      });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    };
  }, []);

  return null;
};

export default Services;
