import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ProviderContext} from 'context/providerContext';
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import Chevron from './chevron';
import Item, {LIST_ITEM_HEIGHT} from './listItem';
import Add, {ADD_SERVICE_HEIGHT} from './addService';

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
  const [options, setOptions] = useState([]);

  const aref = useAnimatedRef();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );
  const height = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: progress.value === 0 ? 8 : 0,
    borderBottomRightRadius: progress.value === 0 ? 8 : 0,
  }));
  const style = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('eventProviders')
        .doc(`${eventProvider.ownerId}`)
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
  }, [eventProvider, service]);

  // if (loading) {
  //   return <Text>worth waiting</Text>;
  // }
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (height.value === 0) {
            runOnUI(() => {
              'worklet';
              height.value = measure(aref).height;
            })();
          }
          open.value = !open.value;
        }}>
        <Animated.View style={[styles.container, headerStyle]}>
          <Text style={styles.title}>{service}</Text>
          <Chevron {...{progress}} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, style]}>
        <Add {...{service}} />

        <View
          ref={aref}
          onLayout={({
            nativeEvent: {
              layout: {height: h},
            },
          }) => console.log({h})}>
          {options
            ? options.map((item, key) => (
                <Item
                  key={key}
                  isLast={key === options.length - 1}
                  {...{item}}
                />
              ))
            : null}
        </View>
      </Animated.View>
    </>
  );
};
