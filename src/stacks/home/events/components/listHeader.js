/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import {Sizing, Typography, Outlines, Colors, Buttons} from 'styles';
import i18n, {isRTL} from 'utils/i18n';

// import EventPlanner from './EventPlanerCard';
import Searchbar from './SearchBar';
import DATA from './eventData';
const {width, height} = Dimensions.get('window');

const SIZE = Sizing.x30;
const ICON_SIZE = SIZE * 0.6;
const SPACING = Sizing.x10;
const s = width * 0.64;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.5;
const RADIUS = 18;
const FULL_SIZE = s + SPACING * 2;

const listHeader = ({navigation}) => {
  const scrollx = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        marginTop: Sizing.x80,
        // paddingLeft: 18,
        // flex: 1,
      }}>
      <Searchbar />
      <View
        style={{
          width,
          marginTop: Sizing.x30,
          // paddingLeft: 18,
          // flex: 1,
        }}>
        <Animatable.View
          animation={'fadeInUp'}
          delay={200}
          duration={300}
          useNativeDriver={true}>
          <Text
            style={[
              {
                ...Typography.header.x40,
                paddingLeft: Sizing.x20,
                color: Colors.secondary.brand,
                marginBottom: Sizing.x10,
              },
            ]}>
            Event Planners
          </Text>
        </Animatable.View>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          snapToInterval={FULL_SIZE}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={1}
          horizontal
          decelerationRate="fast"
          contentContainerStyle={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          snapToAlignment={isRTL ? 'end' : 'start'}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE,
              (index + 1) * FULL_SIZE,
            ];
            const translateX = scrollx.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH - 40, 0, -ITEM_WIDTH],
            });
            const scale = scrollx.interpolate({
              inputRange,
              outputRange: [1, 1.2, 1],
            });
            return (
              <Animatable.View
                animation={isRTL ? 'slideInLeft' : 'slideInRight'}
                delay={index * 100}
                duration={300}
                useNativeDriver={true}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PlannerDetail', {item, index});
                  }}
                  style={styles.itemContainer}>
                  <SharedElement
                    id={`item.${item.key}.image`}
                    style={StyleSheet.absoluteFillObject}>
                    <View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {
                          overflow: 'hidden',
                          borderRadius: Outlines.borderRadius.large,
                        },
                      ]}>
                      <Animated.Image
                        source={item.files[index].image}
                        style={[
                          // StyleSheet.absoluteFillObject,
                          {
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            resizeMode: 'cover',
                            transform: [{scale}],
                          },
                        ]}
                      />
                    </View>
                  </SharedElement>
                  <SharedElement
                    id={`item.${item.key}.title`}
                    style={styles.location}>
                    <Animated.Text
                      style={[styles.location, {transform: [{translateX}]}]}>
                      {item.name}
                    </Animated.Text>
                  </SharedElement>
                  <View style={styles.days}>
                    <Text style={styles.daysValue}>{item.rate}</Text>
                    <Text style={styles.daysLabel}>Rate</Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
        <View
          style={{
            marginTop: Sizing.x10,
            marginBottom: Sizing.x10,
          }}
        />
        <Animatable.View
          animation={'fadeInUp'}
          delay={200}
          duration={300}
          useNativeDriver={true}>
          <Text style={styles.eventTitle}>Event Halls</Text>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
    // overflow: 'hidden',
  },
  eventTitle: {
    ...Typography.header.x40,
    paddingLeft: Sizing.x20,
    color: Colors.secondary.brand,
    marginBottom: Sizing.x10,
  },
  location: {
    fontSize: 30,
    color: Colors.neutral.white,
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    left: SPACING,
    bottom: SPACING,
    width: Sizing.icons.x50,
    height: Sizing.icons.x50,
    borderRadius: Outlines.borderRadius.max,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.brand,
  },
  daysLabel: {
    color: Colors.neutral.white,
    ...Typography.header.x10,
  },
  daysValue: {
    color: Colors.neutral.white,
    ...Typography.header.x10,
  },
});

export default listHeader;
