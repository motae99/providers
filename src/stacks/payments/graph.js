import React from 'react';
import {Text, View, StyleSheet, I18nManager, Dimensions} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {mixPath, useVector} from 'react-native-redash';
import {Colors} from 'styles';
import {GraphIndex, graphs, SIZE} from './model';
import Header from './header';
import Cursor from './cursor';
import Income from './components/incomeSummary';
I18nManager.allowRTL(false);

const {width} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  backgroundSelection: {
    backgroundColor: '#f3f3f3',
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  selection: {
    flexDirection: 'row',
    width: SELECTION_WIDTH,
    alignSelf: 'center',
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Graph = () => {
  const translation = useVector();
  const transition = useSharedValue(0);
  const previous = useSharedValue(0);
  const current = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].data.path;
    const currentPath = graphs[current.value].data.path;
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });

  const animatedFillProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].data.path;
    const currentPath = graphs[current.value].data.path;
    const line = mixPath(transition.value, previousPath, currentPath);
    return {
      d: `${line} L 0 ${SIZE} L ${SIZE} ${SIZE}`,
    };
  });

  const animatedperc = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].kantaData.path;
    const currentPath = graphs[current.value].kantaData.path;
    const line = mixPath(transition.value, previousPath, currentPath);
    return {
      d: `${line} L 0 ${SIZE} L ${SIZE} ${SIZE}`,
    };
  });

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(BUTTON_WIDTH * current.value)}],
  }));
  return (
    <View style={styles.container}>
      {/* <Header translation={translation} index={current} /> */}
      <Income translation={translation} index={current} />
      <View>
        <Svg width={SIZE} height={SIZE * 0.6}>
          <Defs>
            <LinearGradient
              id="paint0_linear"
              x1={2237.25}
              y1={1}
              x2={2237.25}
              y2={1033.5}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor={Colors.primary.brand} stopOpacity={0.6} />
              <Stop
                offset={1}
                stopColor={Colors.secondary.brand}
                stopOpacity={1}
              />
            </LinearGradient>
          </Defs>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke={Colors.primary.brand}
            strokeWidth={3}
          />

          <AnimatedPath
            animatedProps={animatedperc}
            fill="url(#paint0_linear)"
            // d={`${animatedProps} L ${SIZE} ${SIZE}`}
          />

          {/* <AnimatedPath
            animatedProps={animatedperc}
            // fill="red"
          /> */}
        </Svg>
        <Cursor translation={translation} index={current} />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backgroundSelection, style]} />
        </View>
        {graphs.map((graph, index) => {
          return (
            <TouchableWithoutFeedback
              key={graph.label}
              onPress={() => {
                previous.value = current.value;
                transition.value = 0;
                current.value = index;
                transition.value = withTiming(1);
              }}>
              <Animated.View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default Graph;

// const {width} = Dimensions.get('window');
// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const SELECTION_WIDTH = SIZE;
// // const SELECTION_WIDTH = width - 32;
// const BUTTON_WIDTH = SELECTION_WIDTH / graphs.length;
// const styles = StyleSheet.create({
//   container: {
//     width,
//     height: 500,
//     // backgroundColor: 'red',
//     // flex: 1,
//     // backgroundColor: 'white',
//     // backgroundColor: 'rgba(176,239,235, .4)',
//     // borderRadius: 30,
//   },
//   backgroundSelection: {
//     backgroundColor: '#f3f3f3',
//     ...StyleSheet.absoluteFillObject,
//     width: BUTTON_WIDTH,
//     borderRadius: 8,
//     opacity: 0.5,
//   },
//   selection: {
//     flexDirection: 'row',
//     width: SELECTION_WIDTH,
//     alignSelf: 'center',
//   },
//   labelContainer: {
//     padding: 16,
//     width: BUTTON_WIDTH,
//   },
//   label: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// const Graph = () => {
//   const translation = useVector();
//   const transition = useSharedValue(0);
//   const previous = useSharedValue(0);
//   const current = useSharedValue(0);
//   const animatedProps = useAnimatedProps(() => {
//     const previousPath = graphs[previous.value].data.path;
//     const currentPath = graphs[current.value].data.path;
//     return {
//       d: mixPath(transition.value, previousPath, currentPath),
//     };
//   });
//   const style = useAnimatedStyle(() => ({
//     transform: [{translateX: withTiming(BUTTON_WIDTH * current.value)}],
//   }));
//   return (
//     <View style={styles.container}>
//       <View style={{height: 170, width: 400}} />

//       {/* <Header translation={translation} index={current} /> */}
//       {/* <View> */}
//       <View
//         style={{
//           width: SIZE,
//           height: SIZE * 0.6,
//           // backgroundColor: 'red',
//           // alignSelf: 'center',
//           // borderTopLeftRadius: 10,
//           // borderTopRightRadius: 10,
//         }}>
//         <Svg width={SIZE} height={SIZE * 0.6}>
//           <AnimatedPath
//             animatedProps={animatedProps}
//             fill="transparent"
//             stroke="#fff"
//             // stroke={Colors.primary.s600}
//             strokeWidth={4}
//           />
//         </Svg>
//         <Cursor translation={translation} index={current} />
//       </View>
//       <View
//         style={[
//           styles.selection,
//           {
//             // backgroundColor: 'red',
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//           },
//         ]}>
//         <View style={StyleSheet.absoluteFill}>
//           <Animated.View style={[styles.backgroundSelection, style]} />
//         </View>
//         {graphs.map((graph, index) => {
//           return (
//             <TouchableWithoutFeedback
//               key={graph.label}
//               onPress={() => {
//                 previous.value = current.value;
//                 transition.value = 0;
//                 // current.value = index as GraphIndex;
//                 current.value = index;
//                 transition.value = withTiming(1);
//               }}>
//               <Animated.View style={[styles.labelContainer]}>
//                 <Text style={styles.label}>{graph.label}</Text>
//               </Animated.View>
//             </TouchableWithoutFeedback>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default Graph;
