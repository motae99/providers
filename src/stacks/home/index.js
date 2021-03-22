/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import i18n, {isRTL} from 'utils/i18n';
import {AuthContext} from 'context/authContext';

const {width, height} = Dimensions.get('window');

const SPACING = Sizing.x10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.82;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const mymovies = [
  {
    key: '567',
    title: 'EVENTS',
    poster: require('img/events.jpeg'),
    backdrop: require('img/events.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '123',
    title: 'BEAUTY',
    poster: require('img/beauty.jpeg'),
    backdrop: require('img/beauty.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },

  {
    key: '456',
    title: 'PHOTOGRAPHY',
    poster: require('img/photography.jpeg'),
    backdrop: require('img/photography.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '345',
    title: 'MAKEUP ARTISTS',
    poster: require('img/makeup.jpeg'),
    backdrop: require('img/makeup.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '234',
    title: 'HOTELS',
    poster: require('img/hotels.jpeg'),
    backdrop: require('img/hotels.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
];

const Backdrop = ({movies, scrollX, navigation}) => {
  // console.log('here is Rtl', isRTL);
  const {dbUser} = React.useContext(AuthContext);

  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        pagingEnabled
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          // const translateX = scrollX.interpolate({
          //   inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
          //   outputRange: [0, width],
          //   // extrapolate:'clamp'
          // });
          const opacity = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, 1],
            // extrapolate:'clamp'
          });
          // let back = require(item.backdrop)
          return (
            <View>
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: 'absolute',
                  // width: translateX,
                  opacity,
                  height,
                  // overflow: 'hidden',
                }}>
                <Image
                  source={item.backdrop}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: 'absolute',
                  }}
                />
                <LinearGradient
                  colors={[
                    Colors.neutral.black,
                    'rgba(0, 0, 0, 0)',
                    Colors.neutral.white,
                  ]}
                  style={{
                    height: BACKDROP_HEIGHT,
                    width,
                    position: 'absolute',
                    top: 0,
                  }}
                />
                <View
                  style={{
                    width: 255,
                    position: 'absolute',
                    top: Sizing.x70 * 2,
                    left: Sizing.x70,
                    // alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...Typography.header.x50,
                      textAlign: 'center',
                      color: Colors.neutral.white,
                      lineHeight: 30,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />

      <View style={{position: 'absolute', top: Sizing.x50, right: Sizing.x20}}>
        <Text
          style={{
            ...Typography.header.x40,
            textAlign: 'center',
            fontSize: Sizing.x20,
            color: Colors.neutral.white,
            letterSpacing: 3,
          }}>
          KANTA BOOK
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          top: Sizing.x50,
          left: Sizing.x20,
          height: Sizing.icons.x40,
          width: Sizing.icons.x40,
          borderRadius: Sizing.x40,
          backgroundColor: Colors.neutral.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('pressed');
            navigation.toggleDrawer();
          }}>
          <Image
            source={{
              uri: dbUser.photoURL,
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 35,

              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = ({navigation}) => {
  const [movies, setMovies] = React.useState([]);
  const ref = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // const scrollToEnd = ref?.current?.scrollToOffset({
  //       offset: (index - 1) * width,
  //       animated: true,
  //     });

  React.useEffect(() => {
    const fetchData = async () => {
      const movies = mymovies; //await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{key: 'empty-left'}, ...mymovies, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <Backdrop movies={movies} scrollX={scrollX} navigation={navigation} />

      <Animated.FlatList
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={movies}
        // data={isRTL ? movies.reverse() : movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        // onContentSizeChange={scrollToEnd}
        contentContainerStyle={{
          alignItems: 'center',
          // flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
        snapToInterval={ITEM_SIZE}
        // snapToAlignment={isRTL ? 'end' : 'start'}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const newIndex = isRTL ? movies.length - index - 1 : index;
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          const inputRange = [
            (newIndex - 2) * ITEM_SIZE,
            (newIndex - 1) * ITEM_SIZE,
            newIndex * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [115, 70, 115],
            extrapolate: 'clamp',
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
            extrapolate: 'clamp',
          });

          // const opacity = scrollX.interpolate({
          //   inputRange,
          //   outputRange: [0.8, 1, 0.8],
          //   extrapolate: 'clamp',
          // });

          return (
            <View
              style={{
                width: ITEM_SIZE,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Animated.View
                style={{
                  marginHorizontal: Sizing.x10,
                  padding: Sizing.x20,
                  alignItems: 'center',
                  // opacity,
                  backgroundColor: Colors.neutral.white,
                  transform: [{translateY}],
                  borderColor: Colors.neutral.white,
                  borderRadius: Outlines.borderRadius.large,
                }}>
                <View
                  style={{
                    width: '98%',
                    height: ITEM_SIZE,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: Outlines.borderRadius.large,
                  }}>
                  <Animated.Image
                    source={item.poster}
                    style={[styles.posterImage, {transform: [{translateX}]}]}
                  />
                </View>
                {/* <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text> */}
                {/* <Rating rating={item.rating} />
                <Genres genres={item.genres} /> */}
                <Text
                  style={{
                    ...Typography.header.x20,
                    textAlign: 'center',
                    color: Colors.neutral.s400,
                    lineHeight: Sizing.x20,
                    marginVertical: Sizing.x10,
                    width: ITEM_SIZE * 0.7,
                  }}
                  numberOfLines={3}>
                  {item.description}
                </Text>
                <TouchableOpacity
                  style={{
                    margin: Sizing.x10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 54,
                    width: ITEM_SIZE * 0.85,
                    backgroundColor: Colors.secondary.s600,
                    borderRadius: Sizing.x10,
                  }}
                  onPress={() => {
                    if (item.key === '567') {
                      navigation.navigate('EventList');
                    }
                    if (item.key === '123') {
                      navigation.navigate('Beauty');
                    }
                    if (item.key === '456') {
                      navigation.navigate('Photo');
                    }
                  }}>
                  <Text
                    style={{
                      ...Typography.header.x40,
                      textTransform: 'uppercase',
                      color: Colors.neutral.white,
                      textAlign: 'center',
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: Sizing.x20,
    fontSize: Sizing.x20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: ITEM_SIZE + 20,
    height: ITEM_SIZE,
    resizeMode: 'cover',
    borderRadius: Outlines.borderRadius.small,
    marginBottom: Sizing.x10,
  },
});
export default App;
