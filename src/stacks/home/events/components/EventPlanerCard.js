/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import i18n, {isRTL} from 'utils/i18n';

const {width, height} = Dimensions.get('window');

const CardWidth = width - 60;
const CardHight = 280;
const ImageHeight = 200;
const SIZE = 64;
const ICON_SIZE = SIZE * 0.6;
const SPACING = 12;
const s = width * 0.68;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.5;
const RADIUS = 18;
const FULL_SIZE = s * SPACING * 2;

const EventPlannerCard = (data) => {
  const scrollx = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        height: 500,
        width: width,
        // // alignSelf: 'center',
        // marginRight: 18,
        // borderRadius: 17,
        // overflow: 'hidden',
        backgroundColor: 'green',
        flex: 1,
      }}>
      <FlatList
        data={data.files}
        keyExtractor={(item) => item.key}
        snapToInterval={FULL_SIZE}
        showsHorizontalScrollIndicator={false}
        horizontal
        decelerationRate="fast"
        contentContainerStyle={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {x: scrollx}}}],
        //   {useNativeDriver: false},
        // )}
        renderItem={({item, index}) => {
          return (
            // <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
            //   <Image
            //     source={item.image}
            //     style={[
            //       StyleSheet.absoluteFillObject,
            //       {
            //         width: 200,
            //         height: 200,
            //         backgroundColor: '#f00',
            //         resizeMode: 'cover',
            //       },
            //     ]}
            //   />
            //   <Text style={styles.location}>{item.name}</Text>
            //   <View style={styles.days}>
            //     <Text style={styles.daysValue}>{item.rate}</Text>
            //     <Text style={styles.daysLabel}>Rate</Text>
            //   </View>
            // </TouchableOpacity>
            <View style={{backgroundColor: '#E55', width: 300, height: 300}} />
          );
        }}
      />
      {/* <Indicator scrollx={scrollx} /> */}

      {/* <View
        style={{
          position: 'absolute',
          top: 12,
          right: 18,
          height: 28,
          width: 28,
          backgroundColor: '#219CAB',
          borderRadius: 36 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name="heart" size={18} color="#fff" />
      </View>

      <View
        style={{
          position: 'absolute',
          height: 28,
          top: 12,
          left: 22,
          flexDirection: 'row',
          marginRight: 22,
        }}>
        <View
          style={{
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            borderRadius: 36 / 2,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto name="day-sunny" size={20} color="black" />
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
            size={20}
            color="black"
          />
        </View>
      </View>
      <Text
        style={{
          color: '#262F56',
          position: 'absolute',
          bottom: 40,
          fontSize: 18,
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
          bottom: 16,
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
              color: '#262F56',
              fontSize: 16,
              fontWeight: 'bold',
              // letterSpacing: 2,
              fontFamily: 'Montserrat',
            }}>
            {data.rate}
          </Text>
        </View>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
    borderRadius: RADIUS,
    backgroundColor: '#ffd',
  },
  location: {
    fontSize: 30,
    color: '#fff',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {},
  daysLabel: {},
  daysValue: {},
});
export default EventPlannerCard;
