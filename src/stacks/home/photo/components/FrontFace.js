/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {cardWidth, cardHeigh} from './FoldingStyle';

const Base = ({toggle}) => {
  return (
    <TouchableWithoutFeedback onPress={() => toggle()}>
      <View
        style={{
          width: cardWidth,
          height: cardHeigh,
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 20,
          flexDirection: 'row',
        }}>
        <View style={{width: '100%', height: '100%', flex: 1.2}}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: '90%', height: '90%', borderRadius: 20}}
              resizeMode="cover"
              source={require('img/UserPhoto.jpeg')}
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#01c5c4',
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name={'heart'} size={24} color="white" />
            </View>
          </View>
        </View>

        <View style={{width: '100%', height: '100%', flex: 2, margin: 8}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}> John Smith</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name={'star'} size={20} color="#01c5c4" />
              <Text style={{marginHorizontal: 8}}>4.9</Text>
              <View
                style={{
                  // height: 1,
                  width: '65%',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <Text>Requested</Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>2</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text>Indoor</Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>100$</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text>Outdoor</Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>200$</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Base;
