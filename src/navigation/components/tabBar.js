/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Shape from 'assets/svg/bottomTabs';
import PrimaryButton from 'components/buttons/primaryButton';
const width = Dimensions.get('window').width;

const MyTabBar = ({state, descriptors, navigation}) => {
  const tabBarHeight = 60;
  const tabWidth = width / 5;

  return (
    <View style={{position: 'absolute', bottom: 0}}>
      <View style={StyleSheet.absoluteFillObject}>
        <Shape {...{width, tabBarHeight}} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}>
        {state.routes.map((route, index) => {
          // console.log('tabBarOptions', tabBarOptions);
          const {options} = descriptors[route.key];
          // console.log(options);
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (label === 'Booking') {
            return (
              <PrimaryButton
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                containerStyle={{height: tabBarHeight, width: tabWidth}}
                linearstyle={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  marginLeft: 4,
                  marginTop: -20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  name="x"
                  size={24}
                  color={isFocused ? '#fff' : 'white'}
                />
              </PrimaryButton>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                height: tabBarHeight,
                width: tabWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather
                name={options.iconName}
                size={24}
                color={isFocused ? options.activeColor : options.inActiveColor}
              />

              <Text
                style={{
                  color: isFocused
                    ? options.activeColor
                    : options.inActiveColor,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyTabBar;
