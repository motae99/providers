// /* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react';
// import {View, Text} from 'react-native';

// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';
// import Navigator from 'navigation';
// import Services from 'utils/services';
// import Payments from 'stacks/payments';
// import {Reflectly, ColorSelection} from 'stacks/tabs';

// // import codePush from 'react-native-code-push';
// // const codePushOptions = {
// //   updateDialog: true,
// //   checkFrequency: codePush.CheckFrequency.ON_APP_START,
// //   installMode: codePush.InstallMode.IMMEDIATE,
// // };

// const App = ({props}) => {
//   return (
//     <SafeAreaProvider>
//       {/* <Services />
//       <Navigator /> */}
//       <Payments />
//       {/* <ColorSelection /> */}
//       {/* <Reflectly /> */}
//       {/* <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'green',
//           flex: 1,
//         }}>
//         <Text style={{color: 'white'}}>
//           Update Now this is a simple fix for now
//         </Text>
//       </View> */}

//       <Toast ref={ref => Toast.setRef(ref)} />
//     </SafeAreaProvider>
//   );
// };

// export default codePush(codePushOptions)(App);

// export default App;
import * as React from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
// import Constants from 'expo-constants';
import Svg, {G, Circle, Rect} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Donut = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 0,
  textColor,
  max = 100,
}) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = toValue => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      animation(toValue === 0 ? percentage : 0);
    });
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, percentage],
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 2, color: textColor ?? color},
          styles.text,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {fontWeight: '900', textAlign: 'center'},
});

export default Donut;
