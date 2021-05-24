import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Graph from './graph';
import Footer from './components/footer';
import NavBar from './components/navBar';
import Progress from './components/progress';
import Gouge from './components/gouge';
import Stats from './components/bookingStats';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});

const Rainbow = () => {
  return (
    <View style={styles.container}>
      <NavBar />
      <Graph />
      <Progress />
      <Gouge />
    </View>
  );
};

export default Rainbow;
