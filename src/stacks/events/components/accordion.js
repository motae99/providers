/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ProviderContext} from 'context/providerContext';
import {SafeAreaView} from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';
import EventServices from './eventServices';
import List from './list';
const {width, height} = Dimensions.get('window');
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
  const {navigate} = useNavigation();
  const {eventServices} = useContext(ProviderContext);

  // const [services, setServices] = useState(eventProvider.services);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      <TouchableOpacity
        onPress={() => navigate('Unverified')}
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
          width: width,
          backgroundColor: 'gray',
        }}>
        <Text style={{color: 'white'}}>Verify me </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
