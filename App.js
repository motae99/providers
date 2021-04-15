/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamicLinks';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Navigator from 'navigation';

// import codePush from 'react-native-code-push';
// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

const App = ({props}) => {
  function handleDynamicLink(link) {
    console.log(link);
  }

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

    // Update a users messages list using AsyncStorage
    // const currentMessages = await AsyncStorage.getItem('messages');
    // const messageArray = JSON.parse(currentMessages);
    // messageArray.push(remoteMessage.data);
    // await AsyncStorage.setItem('messages', JSON.stringify(messageArray));

    if (remoteMessage) {
      if (remoteMessage.notification) {
        title = remoteMessage.notification.title;
        body = remoteMessage.notification.body;
      }

      if (remoteMessage.data) {
        // If user tab on the notification when the app is in background or not running
        if (fromBackground && remoteMessage.data.msgType) {
          switch (remoteMessage.data.msgType) {
            case 'Search':
              // this.forwardToSearchPage(remoteMessage.data.word);
              console.log('you should navigate now to a a page of search');
              return; // terminate the method here

            // More cases in when app get bigger
          }
        }

        // Notification arrive while the app is running in foreground
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

  useEffect(async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
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
    return unsubscribe;
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Navigator />

      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default App;
