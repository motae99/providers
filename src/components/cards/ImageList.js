/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const files = [
  {
    key: '123',
    image: require('./assets/img/beauty.jpeg'),
  },
  {
    key: '234',
    image: require('./assets/img/hotels.jpeg'),
  },
  {
    key: '345',
    image: require('./assets/img/makeup.jpeg'),
  },
  {
    key: '456',
    image: require('./assets/img/photography.jpeg'),
  },
  {
    key: '567',
    image: require('./assets/img/events.jpeg'),
  },
];

const Indicator = ({scrollx}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 30,
        flexDirection: 'row',
      }}>
      {files.map((_, i) => {
        const inputRange = [
          (i - 2) * width,
          (i - 1) * width,
          i * width,
          (i + 1) * width,
          (i + 2) * width,
        ];
        // const scale = scrollx.interpolate({
        //   inputRange,
        //   outputRange: [0, 0.5, 1, 0.5],
        //   extrapolate: 'clamp',
        // });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0, 0.8, 1, 0.8, 0],
          // extrapolate: 'clamp',
        });

        const color = scrollx.interpolate({
          inputRange,
          outputRange: [
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            '#fff',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
          ],
          // extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              backgroundColor: color,
              opacity,
              margin: 4,
              borderWidth: 1,
              borderColor: '#fff',
              borderColorOpacity: opacity,
              // transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const App = () => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{}}>
      <Animated.FlatList
        data={files}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        // decelerationRate={16}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        snapToInterval={width}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                // borderRadius: 16,
                width: width - 20,
                height: 200,
                marginHorizontal: 10,
              }}>
              <Image
                source={item.image}
                style={{
                  // flex: 1,
                  width: width - 20,
                  height: 200,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }}
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'black']}
                style={{
                  height: 80,
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
      <Indicator scrollx={scrollx} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default App;
