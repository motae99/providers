import * as React from 'react';
import {Text, View, Dimensions, StatusBar, FlatList, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const {width, height} = Dimensions.get('window');

const mymovies = [
  {
    key: '567',
    poster: require('./assets/img/events.jpeg'),
  },
  {
    key: '123',
    poster: require('./assets/img/beauty.jpeg'),
  },
  {
    key: '345',
    poster: require('./assets/img/makeup.jpeg'),
  },
  {
    key: '234',
    poster: require('./assets/img/hotels.jpeg'),
  },

  {
    key: '456',
    poster: require('./assets/img/photography.jpeg'),
  },
];

const headerImageHeight = height * 0.65;
const headerHieght = height / 6;

const HeaderImage = () => {
  const [current, setCurrent] = React.useState(1);
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    // console.log(viewableItems[0].index+1);
    // Use viewable items in state or as intended
    setCurrent(viewableItems[0].index + 1);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 60});
  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          width,
          height: headerImageHeight,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          overflow: 'hidden',
        }}>
        <FlatList
          horizontal
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          data={mymovies}
          keyExtractor={(item) => item.key}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item, index}) => {
            return (
              <View>
                <Image
                  style={{
                    width,
                    height: headerImageHeight,
                    resizeMode: 'cover',
                  }}
                  source={item.poster}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            width: 50,
            height: 24,
            backgroundColor: 'rgba(34,40,42,.7)',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            // opacity: 0.6,
          }}>
          <Text style={{color: 'white'}}>
            {current}/{mymovies.length}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: headerHieght,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            height: 32,
            width: 32,
            backgroundColor: 'white',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="arrow-back" size={20} color="#2B3449" />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <Ionicons name="heart" size={20} color="#2B3449" />
          </View>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Fontisto name="share-a" size={18} color="#2B3449" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderImage;
