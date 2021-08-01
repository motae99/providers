/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import {Colors, Sizing, Typography} from 'styles';
import Icon from 'react-native-vector-icons/AntDesign';
import GButton from 'components/buttons/primaryButton';
const {width, height} = Dimensions.get('window');
const cardHeight = height * 0.27;
const cardWidth = width * 0.75;
export default () => {
  return (
    <View
      style={{
        height: cardHeight,
        width: cardWidth,
        backgroundColor: Colors.neutral.white,
        borderRadius: Sizing.x10,
        marginHorizontal: 10,
        // shadowColor: 'rgba(0, 0, 0, 0.9)',
        // shadowOpacity: 1,
        // elevation: 8,
        // shadowRadius: Sizing.x10,
        // shadowOffset: {width: 10, height: 10},
      }}>
      <Image
        source={require('img/events.jpeg')}
        style={{
          borderRadius: Sizing.x10,
          height: cardHeight / 2,
          width: cardWidth,
        }}
      />
      <View
        style={{
          paddingHorizontal: Sizing.x10,
          paddingVertical: 10,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
          }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={{
              ...Typography.body.x30,
              // lineHeight: 22,
              // textAlignVertical: 'center',
            }}>
            $100
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              ...Typography.body.x10,
              textDecorationLine: 'line-through',
              marginLeft: 10,
            }}>
            $200
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={{
            ...Typography.body.x30,
            // backgroundColor: 'red',
            // fontFamily: 'Cairo-Bold',
            textTransform: 'capitalize',
          }}>
          provider اسم
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // backgroundColor: 'navy',
          }}>
          <Icon name="calendar" size={14} />
          <Text
            allowFontScaling={false}
            style={{
              ...Typography.body.x10,
              textTransform: 'capitalize',
              paddingLeft: Sizing.x5,
              paddingRight: Sizing.x5,
            }}>
            dec 30, 2020
          </Text>
          <View
            style={{
              borderRightWidth: 0.8,
              marginVertical: 2,
              // alignSelf: 'center',
            }}
          />
          <Text
            allowFontScaling={false}
            style={{
              ...Typography.body.x10,
              // textAlign: 'center',
              marginLeft: 5,
            }}>
            2 days left
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'orange',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="star" size={16} />
            <Text
              allowFontScaling={false}
              style={{
                ...Typography.body.x10,
                paddingLeft: Sizing.x5,
                paddingRight: Sizing.x5,
                // alignSelf: 'center',
                textTransform: 'capitalize',
              }}>
              4.9(2.2k review)
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'blue',
                width: 50,
              }}>
              <Image
                source={require('img/events.jpeg')}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  // overflow: 'hidden',
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
              <Image
                source={require('img/beauty.jpeg')}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  // overflow: 'hidden',
                  borderColor: 'white',
                  transform: [{translateX: -10}],
                  borderWidth: 2,
                }}
              />

              <View
                style={{
                  backgroundColor: Colors.secondary.s200,
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'white',
                  borderWidth: 2,
                  transform: [{translateX: -20}],
                }}>
                <Text
                  allowFontScaling={false}
                  style={{...Typography.body.x10, fontWeight: 'bold'}}>
                  80
                </Text>
              </View>
            </View>
          </View>
          <GButton
            containerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            linearstyle={{
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: Colors.primary.brand,
              shadowOpacity: 1,
              elevation: 8,
              shadowRadius: 15,
              shadowOffset: {width: 1, height: 13},
            }}>
            <Text
              allowFontScaling={false}
              style={{
                ...Typography.body.x10,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'white',
              }}>
              book now
            </Text>
          </GButton>
        </View>
      </View>
    </View>
  );
};
