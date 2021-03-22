/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {Sizing, Outlines, Colors} from 'styles';

const SearchBarHieght = 50;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: Sizing.x20,
        height: SearchBarHieght,
      }}>
      <Animatable.View
        animation={'rubberBand'}
        delay={100}
        duration={500}
        useNativeDriver={true}
        style={{flex: 5}}>
        <Searchbar
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: Outlines.borderRadius.base,
            marginRight: Sizing.x10,
            justifyContent: 'center',
            borderWidth: 0,
          }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Animatable.View>

      <Animatable.View
        animation={'pulse'}
        delay={100}
        duration={400}
        useNativeDriver={true}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            borderRadius: Outlines.borderRadius.base,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={[Colors.primary.s200, Colors.primary.brand]}
            style={StyleSheet.absoluteFillObject}
          />
          <Ionicons name="filter" size={24} color={Colors.neutral.white} />
        </View>
      </Animatable.View>
    </View>
  );
};
export default SearchBar;
