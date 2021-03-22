/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ListHeader from 'eventsComponents/listHeader';
import EventCard from 'eventsComponents/EventCard';
import DATA from 'eventsComponents/eventData';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const EventList = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      {/* <Image
        source={require('img/events.jpeg')}
        blurRadius={9}
        style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
      /> */}

      <View
        style={
          {
            // marginTop: Sizing.x80,
          }
        }>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader navigation={navigation} />}
          initialNumToRender={3}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Sizing.x20,
          }}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation={'fadeInUp'}
                delay={index * 400}
                duration={400}
                useNativeDriver={true}>
                <EventCard data={item} navigation={navigation} />
              </Animatable.View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EventMap');
        }}
        style={{
          position: 'absolute',
          bottom: Sizing.x30,
          right: Sizing.x30,
          height: Sizing.icons.x40,
          width: Sizing.icons.x40,
          borderRadius: Outlines.borderRadius.large,
          backgroundColor: Colors.neutral.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons
          name="map"
          size={Sizing.icons.x20}
          color={Colors.secondary.brand}
        />
      </TouchableOpacity>
    </View>
  );
};
export default EventList;
