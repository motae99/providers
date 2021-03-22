import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DateTimePicker from '@react-native-community/datetimepicker';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {fWidth, fHeight} from './FoldingStyle';

const DateSection = () => {
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
  return (
    <View
      style={{
        width: fWidth,
        height: fHeight,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, paddingHorizontal: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <TouchableWithoutFeedback onPress={showDatepicker}>
            <AntDesign name={'calendar'} size={24} color="#01c5c4" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{flex: 4, justifyContent: 'space-between'}}>
          <Text>Date</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Jan/05/2020</Text>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <AntDesign name="pay-circle-o1" size={24} color="#01c5c4" />
        </View>
        <View style={{flex: 4, justifyContent: 'space-between'}}>
          <Text>Price</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>$ 150</Text>
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
    </View>
  );
};

export default DateSection;
