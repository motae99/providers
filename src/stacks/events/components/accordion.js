import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {useNavigation} from 'react-navigation-hooks';
import {ProviderContext} from 'context/providerContext';

import Feather from 'react-native-vector-icons/Feather';
import EventServices from './eventServices';
import List from './list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default () => {
  // const {navigate} = useNavigation();
  const {eventServices} = useContext(ProviderContext);

  // const [services, setServices] = useState(eventProvider.services);
  console.log('eventServices', eventServices);
  return (
    <ScrollView style={styles.container}>
      <EventServices />
      {eventServices
        ? eventServices.map((objects, i) => {
            // console.log('service', service.name);
            const {name, key} = objects;
            const service = name;
            return <List key={key} {...{service}} />;
          })
        : null}
    </ScrollView>
  );
};
