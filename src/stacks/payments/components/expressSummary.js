/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Summary = ({
  processCategoryDataToDisplay,
  selectedCategory,
  setSelectCategoryByName,
  COLORS,
}) => {
  let data = processCategoryDataToDisplay();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor:
          selectedCategory && selectedCategory.name === item.name
            ? item.color
            : COLORS.white,
      }}
      onPress={() => {
        let categoryName = item.name;
        setSelectCategoryByName(categoryName);
      }}>
      {/* Name/Category */}
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor:
              selectedCategory && selectedCategory.name === item.name
                ? COLORS.white
                : item.color,
            borderRadius: 10,
          }}
        />

        <View style={{marginLeft: 16}}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name === item.name
                  ? COLORS.white
                  : COLORS.primary,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name === item.name
                  ? COLORS.white
                  : COLORS.primary,
            }}>
            {item.name}
          </Text>
        </View>
      </View>

      {/* Expenses */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color:
              selectedCategory && selectedCategory.name === item.name
                ? COLORS.white
                : COLORS.primary,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          ${item.y}
        </Text>
        <Text
          style={{
            color:
              selectedCategory && selectedCategory.name === item.name
                ? COLORS.white
                : COLORS.primary,
          }}>
          Left {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 10}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

export default Summary;
