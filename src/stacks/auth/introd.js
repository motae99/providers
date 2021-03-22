/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import LottieView from 'lottie-react-native';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const bgs = [
  Colors.primary.brand,
  Colors.secondary.brand,
  Colors.primary.brand,
  Colors.secondary.brand,
];
const DATA = [
  {
    key: '3571572',
    title: 'Multi intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
    lottie: require('lottie/first.json'),

    first: Colors.primary.s200,
    second: Colors.primary.brand,
  },
  {
    key: '3571747',
    title: 'Automated radical warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
    lottie: require('lottie/second.json'),

    first: Colors.secondary.s200,
    second: Colors.secondary.brand,
  },
  {
    key: '3571680',
    title: 'Inverse oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
    lottie: require('lottie/first.json'),

    first: Colors.primary.s200,
    second: Colors.primary.brand,
  },
  {
    key: '3571603',
    title: 'Monitored global data',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
    lottie: require('lottie/second.json'),

    first: Colors.secondary.s200,
    second: Colors.secondary.brand,
  },
];

const Indicator = ({scrollx}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        // const scale = scrollx.interpolate({
        //   inputRange,
        //   outputRange: [1, 0.8, 1],
        //   extrapolate: 'clamp',
        // });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [1, 0.6, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: Sizing.x5,
              width: Sizing.x5,
              borderRadius: Outlines.borderRadius.base,
              backgroundColor: '#fff',
              opacity,
              margin: Sizing.x5,
              // transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({scrollx}) => {
  const backgroundColor = scrollx.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
    // <LinearGradient
    //   colors={[Colors.primary.s200, Colors.primary.brand]}
    //   style={StyleSheet.absoluteFillObject}
    // />
  );
};

const Square = ({scrollx}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['12deg', '0deg', '12deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-90, -height, -90],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        borderRadius: 100,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -height * 0.51,
        left: -height * 0.34,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default function App({navigation}) {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const ref = React.useRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Backdrop scrollx={scrollx} />
      <Square scrollx={scrollx} />
      <Animated.FlatList
        ref={ref}
        onMomentumScrollEnd={(ev) => {
          setIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        pagingEnabled
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={{width, alignItems: 'center', padding: Sizing.x20}}>
              <View style={{flex: 0.5, justifyContent: 'center'}}>
                {/* <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: height / 4,
                    resizeMode: 'contain',
                  }}
                /> */}
                <LottieView
                  style={{width: width / 2, height: height / 4}}
                  source={item.lottie}
                  autoPlay
                  loop
                />
              </View>
              <View style={{flex: 0.13}} />
              <View style={{flex: 0.3, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    ...Typography.header.x50,
                    color: Colors.neutral.white,
                    paddingBottom: Sizing.x10,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...Typography.body.x10,
                    color: Colors.neutral.white,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: Sizing.x20,
          width: width,
        }}>
        <View
          style={{
            height: Sizing.x70,
            marginBottom: Sizing.x50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{
              height: '100%',
              width: width / 2 - Sizing.x40,
              marginHorizontal: Sizing.x20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Outlines.borderRadius.base,
            }}>
            <Text
              style={{...Typography.header.x20, color: Colors.neutral.black}}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{
              height: '100%',
              width: width / 2 - Sizing.x40,
              marginHorizontal: Sizing.x20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Outlines.borderRadius.base,
            }}>
            <Text
              style={{...Typography.header.x20, color: Colors.neutral.black}}>
              Create account
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizing.x20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: DATA.length * width,
                animated: true,
              });
            }}>
            <Text
              style={{...Typography.header.x20, color: Colors.neutral.white}}>
              Skip
            </Text>
          </TouchableOpacity>

          <Indicator scrollx={scrollx} />
          <TouchableOpacity
            onPress={() => {
              setIndex(index + 1);
              ref?.current?.scrollToOffset({
                offset: (index + 1) * width,
                animated: true,
              });
            }}>
            <Text
              style={{...Typography.header.x20, color: Colors.neutral.white}}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'green',
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
