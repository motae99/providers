import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ProviderContext} from 'context/providerContext';

import Animated from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash/lib/module/v1';
import Chevron from './chevron';
import Item, {LIST_ITEM_HEIGHT} from './listItem';
import Add, {ADD_SERVICE_HEIGHT} from './addService';

const {interpolate} = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    overflow: 'hidden',
  },
});

// export interface List {
//   name: string;
//   items: ListItem[];
// }

// interface ListProps {
//   list: List;
// }

export default ({list, service}) => {
  const {eventProvider} = useContext(ProviderContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('eventProviders')
        .doc('EQfOKFQWmySSmJ3aXMPTF7lJDwq2')
        .collection(`${service}`)
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const allOptions = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });
            if (allOptions && allOptions.length > 0) {
              // console.log(allOptions);
              setOptions(allOptions);
            }
          }
        });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [open, service]);

  const transition = useTransition(open);
  const height = mix(
    transition,
    0,
    LIST_ITEM_HEIGHT * options.length + ADD_SERVICE_HEIGHT,
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  // if (loading) {
  //   return <Text>worth waiting</Text>;
  // }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}>
          <Text style={styles.title}>{service}</Text>
          <Chevron {...{transition}} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, {height}]}>
        <Add {...{service}} />

        {options
          ? options.map((item, key) => (
              <Item key={key} isLast={key === options.length - 1} {...{item}} />
            ))
          : null}
      </Animated.View>
    </>
  );
};
