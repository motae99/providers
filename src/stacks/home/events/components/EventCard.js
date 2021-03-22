/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';

import Indicator from '../../../../components/Indicator';

const {width, height} = Dimensions.get('window');
const CardWidth = height / 2.15;
const CardHight = height / 3.8;

const EventCard = ({data, navigation}) => {
  const list = React.useRef();
  const [current, setCurrent] = React.useState(0);
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const scrollx = React.useRef(new Animated.Value(0)).current;
  return (
    <View
      style={{
        height: CardHight,
        width: CardWidth,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 18,
      }}>
      <Animated.FlatList
        data={data.files}
        ref={list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        pagingEnabled={true}
        decelerationRate={'fast'}
        horizontal
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        // onMomentumScrollEnd={(ev) => {
        //   const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
        //   console.log(newIndex + 1);
        //   setCurrentIndex(newIndex);
        // }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        snapToInterval={CardWidth}
        renderItem={({item, index}) => {
          return (
            <View
              style={
                {
                  // width: CardWidth,
                  // height: CardHight,
                  // borderRadius: 16,
                  // overflow: 'hidden',
                }
              }>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  list.current.scrollToIndex({
                    animated: true,
                    index: 0,
                  });

                  setTimeout(() => {
                    navigation.navigate('EventDetail', {
                      selectedItem: data,
                      selectedImageIndex: current,
                    });
                  }, 100);
                }}>
                <SharedElement
                  id={`item.${data.key}.image.${item.key}`}
                  style={[
                    {
                      width: CardWidth,
                      height: CardHight,
                    },
                  ]}>
                  <Image
                    source={item.image}
                    style={[
                      {
                        width: CardWidth,
                        height: CardHight,
                        resizeMode: 'cover',
                        borderRadius: 12,
                      },
                    ]}
                  />
                </SharedElement>
              </TouchableOpacity>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'black']}
                style={{
                  height: CardHight / 3,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              />
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          flexDirection: 'row',
        }}>
        <Indicator
          scrollx={scrollx}
          files={data.files}
          containerWidth={CardWidth}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 18,
          height: 28,
          width: 28,
          backgroundColor: '#fff',
          borderRadius: 36 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="heart" size={18} color="#219CAB" />
      </View>

      <View
        style={{
          position: 'absolute',
          height: 28,
          top: 12,
          left: 18,
          flexDirection: 'row',
          marginRight: 12,
        }}>
        <View
          style={{
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            borderRadius: 36 / 2,
            marginRight: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto name="day-sunny" size={18} color="black" />
        </View>
        <View
          style={{
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            borderRadius: 36 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="weather-night"
            size={18}
            color="black"
          />
        </View>
      </View>
      <Text
        style={{
          color: '#fff',
          position: 'absolute',
          bottom: 38,
          fontSize: 14,
          fontWeight: 'bold',
          letterSpacing: 2,
          fontFamily: 'Montserrat',
          left: 24,
        }}>
        {data.name}
      </Text>
      <View
        style={{
          color: '#fff',
          position: 'absolute',
          bottom: 12,
          left: 24,
          flexDirection: 'row',
          width: width / 3,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: 12,
            }}>
            <FontAwesome name="star" size={18} color="#219CAB" />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: 2,
              fontFamily: 'Montserrat',
            }}>
            {data.rate}
          </Text>
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 2,
            fontFamily: 'Montserrat',
          }}>
          ${data.price}
        </Text>
      </View>
    </View>
  );
};
export default EventCard;
