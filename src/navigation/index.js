/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import AuthStack from 'navigation/authStack';
import DrawerStack from 'navigation/drawerStack';

import AuthContextProvider from 'context/authContext';

const AppStack = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [User, setUser] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // get Provider ID
    // user.providerData[0].providerId
    // google.com
    // facebook.com
    // phone

    // console.log(user?.providerData[0]);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    // We haven't finished checking for the token yet
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text> SplashScreen </Text>
      </View>
    );
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        {User ? <DrawerStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default AppStack;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
// import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
// import {GoogleSignin} from '@react-native-community/google-signin';
// import AuthStack from './authStack';
// import DrawerStack from './drawerStack';

// export const AuthContext = React.createContext();

// const AppStack = () => {
//   const [initializing, setInitializing] = React.useState(true);
//   const [user, setUser] = React.useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) {
//       setInitializing(false);
//     }
//   }

//   React.useEffect(() => {
//     GoogleSignin.configure({
//       // scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
//       webClientId:
//         '337309192499-n2cu8ljihpaim2lnjc074hdhtu5rojh1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     });

//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };

//         case 'GOOGLE_SIGN':
//           // return auth().signInWithCredential(googleCredential);

//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'FACEBOOK_SIGN':
//           // Sign-in the user with the credential
//           // return auth().signInWithCredential(facebookCredential);
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'PHONE_SIGN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     },
//   );

//   React.useEffect(() => {
//     // Fetch the token from storage then navigate to our appropriate place
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         // Restoring token failed
//       }

//       // After restoring token, we may need to validate it in production apps

//       // This will switch to the App screen or Auth screen and this loading
//       // screen will be unmounted and thrown away.
//       dispatch({type: 'RESTORE_TOKEN', token: userToken});
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async (data) => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
//       },
//       googleSign: async () => {
//         // Get the users ID token
//         const {idToken} = await GoogleSignin.signIn();

//         // Create a Google credential with the token
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//         console.log(googleCredential);
//         // Sign-in the user with the credential
//         return auth().signInWithCredential(googleCredential);

//         // dispatch({type: 'GOOGLE_SIGN', token: googleCredential});
//       },
//       facebookSign: async () => {
//         // Attempt login with permissions
//         const result = await LoginManager.logInWithPermissions([
//           'public_profile',
//           'email',
//         ]);

//         if (result.isCancelled) {
//           throw 'User cancelled the login process';
//         }
//         console.log(result);
//         // Once signed in, get the users AccesToken
//         const data = await AccessToken.getCurrentAccessToken();

//         if (!data) {
//           throw 'Something went wrong obtaining access token';
//         }

//         // Create a Firebase credential with the AccessToken
//         const facebookCredential = auth.FacebookAuthProvider.credential(
//           data.accessToken,
//         );

//         return auth().signInWithCredential(facebookCredential);

//         // dispatch({type: 'FACEBOOK_SIGN', token: facebookCredential});
//       },
//       signOut: async () => {
//         // try {
//         //   await GoogleSignin.revokeAccess();
//         //   await GoogleSignin.signOut();
//         //   setloggedIn(false);
//         //   setuserInfo([]);
//         // } catch (error) {
//         //   console.error(error);
//         // }

//         // LoginManager.logOut();
//         auth()
//           .signOut()
//           .then(() => console.log('User signed out!'));
//         dispatch({type: 'SIGN_OUT'});
//       },
//       signUp: async (data) => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
//       },
//     }),
//     [],
//   );

//   return (
//     <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         {user == null ? <AuthStack /> : <DrawerStack />}
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// };

// export default AppStack;
