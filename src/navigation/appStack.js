/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
// import {AddProvider, AddServices} from 'navigation/homeStack';
import DrawerStack from 'navigation/drawerStack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import EventProvider from 'stacks/providers/event';
import PhotoProvider from 'stacks/providers/photo';

import Galary from 'stacks/galary';
import Story from 'stacks/galary/story';
import {AuthContext} from 'context/authContext';
import ProviderContextProvider from 'context/providerContext';

const Stack = createSharedElementStackNavigator();

export default function App() {
  const [provider, setProvider] = React.useState(null);
  const {dbUser, signOut} = React.useContext(AuthContext);
  const [filterQuery, setFilterQuery] = React.useState(null);

  React.useMemo(() => {
    if (dbUser) {
      if (dbUser?.serviceType === 'Events') {
        const query = firestore().collection('eventProviders').doc(dbUser?.uid);
        setFilterQuery(query);
      }

      if (dbUser?.serviceType === 'Photography') {
        const query = firestore().collection('photoProviders').doc(dbUser?.uid);
        setFilterQuery(query);
      }

      if (dbUser?.serviceType === 'EventPlanner') {
        const query = firestore()
          .collection('eventPlannerProviders')
          .doc(dbUser?.uid);
        setFilterQuery(query);
      }
    }
  }, [dbUser]);

  React.useEffect(() => {
    // signOut();
    if (filterQuery) {
      const subscriber = filterQuery.onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User data: ', documentSnapshot.data());
          setProvider(documentSnapshot.data());
        } else {
          setProvider(null);
        }
      });
      return () => subscriber();
    }
  }, [filterQuery]);

  if (!dbUser) {
    return (
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>Data Base user not ready</Text>
      </View>
    );
  }

  // if (User && !User.phoneNumber) {
  //   return <Phone />;
  // }

  return (
    <ProviderContextProvider>
      {!provider ? (
        <Stack.Navigator headerMode={'none'}>
          {/* {dbUser.serviceType === 'Photography' ? ( */}
          <Stack.Screen
            name="PhotoProvider"
            component={
              dbUser.serviceType === 'Photography'
                ? PhotoProvider
                : EventProvider
            }
          />
          {/* ) : dbUser.serviceType === 'Events' ? (
            <Stack.Screen name="EventProvider" component={EventProvider} />
          ) : null} */}
        </Stack.Navigator>
      ) : (
        // <AddProvider />
        // provider && !provider.verified ? (
        //   // <AddServices />
        // ) :
        <DrawerStack />
      )}
    </ProviderContextProvider>
  );
}
