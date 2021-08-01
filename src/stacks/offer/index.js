/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Colors, Sizing, Typography} from 'styles';
import LinearGradient from 'react-native-linear-gradient';
import CompoOffer from './components/compoOffer';
import OfferCard from './components/offerCard';
const {width, height} = Dimensions.get('window');
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <LinearGradient
        style={{flex: 1}}
        start={{x: 0, y: 0.1}}
        end={{x: 0.5, y: 0.25}}
        locations={[0, 0.19]}
        colors={[Colors.secondary.s200, Colors.neutral.s100]}
        useAngle={true}
        angle={140}>
        <View
          style={{
            height: 50,
            paddingHorizontal: Sizing.x20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Image
            source={require('img/UserPhoto.jpeg')}
            style={{height: 35, width: 35, borderRadius: 10}}
          />
          <Icon name="bell" size={24} />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          decelerationRate={'fast'}
          snapToInterval={width * 0.8 + Sizing.x10 * 2}
          // contentContainerStyle={{marginHorizontal: Sizing.x10}}
        >
          <CompoOffer />
          <CompoOffer />
          <CompoOffer />
          <CompoOffer />
          <CompoOffer />
        </ScrollView>
        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: Sizing.x10,
              // backgroundColor: 'red',
            }}>
            <Text
              style={{...Typography.header.x30, textTransform: 'capitalize'}}>
              events
            </Text>
            <Text
              style={{
                ...Typography.header.x10,
                textTransform: 'capitalize',
                color: Colors.primary.brand,
                fontWeight: 'bold',
              }}>
              see more
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            decelerationRate={'fast'}
            snapToInterval={width * 0.75 + Sizing.x10 * 2}
            // contentContainerStyle={{marginHorizontal: Sizing.x10}}
          >
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </ScrollView>
        </View>

        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: Sizing.x10,
              // backgroundColor: 'red',
              // height: 40,
            }}>
            <Text
              style={{...Typography.header.x30, textTransform: 'capitalize'}}>
              events
            </Text>
            <Text
              style={{
                ...Typography.header.x10,
                textTransform: 'capitalize',
                color: Colors.primary.brand,
              }}>
              see more
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            decelerationRate={'fast'}
            snapToInterval={width * 0.75 + Sizing.x10 * 2}
            // contentContainerStyle={{marginHorizontal: Sizing.x10}}
          >
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
