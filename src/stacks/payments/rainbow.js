import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Colors} from 'styles';
import IncomeSummary from './components/incomeSummary';
import Graph from './graph';
import Footer from './components/footer';
import NavBar from './components/navBar';
import Progress from './components/progress';
import Gouge from './components/gouge';
import Stats from './components/bookingStats';
import Background from 'assets/svg/background';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.s100,
    // justifyContent: 'space-between',
  },
});

const Rainbow = () => {
  return (
    <View style={styles.container}>
      {/* <View style={{position: 'absolute', top: 0, right: 0}}>
        <Background />
      </View> */}

      {/* <View style={{height: 150, width: 400}} /> */}

      {/* <Progress /> */}
      {/* <Gouge /> */}
      {/* </Background> */}
      {/* <View style={StyleSheet.absoluteFillObject}>

      </View> */}
      {/* <IncomeSummary /> */}
      <Graph />
      <Gouge />
    </View>
  );
};

export default Rainbow;
