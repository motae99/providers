import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MARGIN, SIZE, WIDTH_SIZE, HEGHT_SIZE} from './config';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {SharedElement} from 'react-navigation-shared-element';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    // width: WIDTH_SIZE,
    // height: HEGHT_SIZE,
  },
});

const Tile = ({item}) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = React.useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  return (
    <TouchableOpacity
      // style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}
      style={[
        ({pressed}) => ({opacity: pressed ? 0.5 : 1}),
        // styles.container,
        // {opacity},
      ]}
      onPress={() => {
        setOpacity(0);
        navigation.navigate('Story', {item});
      }}>
      <View style={[styles.container, {opacity}]}>
        <SharedElement
          id={`sharedImage.${item.src.portrait}`}
          style={{flex: 1}}>
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
              margin: MARGIN * 2,
              borderRadius: MARGIN * 2,
              resizeMode: 'cover',
              opacity,
            }}
            source={{
              uri: item.src.portrait,
              // priority: FastImage.priority.normal,
              // cashe: FastImage.cacheControl.immutable,
            }}
            // resizeMode={FastImage.resizeMode.cover}
          />
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default Tile;
