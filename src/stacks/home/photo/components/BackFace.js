import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import {cardWidth, cardHeigh} from './FoldingStyle';
import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

const Base = ({toggle, animation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [20, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    // <View>
    <TouchableWithoutFeedback onPress={() => {}}>
      <Animated.View
        style={{
          backgroundColor: 'white',
          width: cardWidth,
          height: cardHeigh,
          borderRadius,
        }}>
        <View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text>1</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>2</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>3</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingHorizontal: 10, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <TouchableWithoutFeedback onPress={showTimepicker}>
                <Ionicons name="ios-time-outline" size={24} color="#01c5c4" />
              </TouchableWithoutFeedback>
            </View>
            <View style={{flex: 4, justifyContent: 'space-evenly'}}>
              <Text>From</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>05/30 PM</Text>
            </View>
          </View>

          <View style={{flex: 1, paddingHorizontal: 10, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <TouchableWithoutFeedback onPress={showTimepicker}>
                <Ionicons name="ios-time-outline" size={24} color="#B98EFF" />
              </TouchableWithoutFeedback>
            </View>
            <View style={{flex: 4, justifyContent: 'space-evenly'}}>
              <Text>To</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>10/30 PM</Text>
            </View>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
    // </View>
  );
};

export default Base;
