import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
});

const Chart = ({
  processCategoryDataToDisplay,
  selectedCategory,
  setSelectCategoryByName,
}) => {
  let chartData = processCategoryDataToDisplay();

  let totalExpenseCount = chartData.reduce(
    (a, b) => a + (b.expenseCount || 0),
    0,
  );

  let colorScales = chartData.map(item => item.color);

  return (
    <View style={styles.container}>
      <Svg width={width} height={width} style={{width: '100%', height: 'auto'}}>
        <VictoryPie
          standalone={false} // Android workaround
          data={chartData}
          labels={datum => `${datum.y}`}
          radius={({datum}) =>
            selectedCategory && selectedCategory.name === datum.name
              ? width * 0.4
              : width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({innerRadius}) => (width * 0.4 + innerRadius) / 2.5}
          style={{
            labels: {fill: 'white'},
            parent: {
              ...styles.shadow,
            },
          }}
          width={width}
          height={width}
          colorScale={colorScales}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: props => {
                        let categoryName = chartData[props.index].name;
                        setSelectCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </Svg>
      <View style={{position: 'absolute', top: '42%', left: '42%'}}>
        <Text style={{textAlign: 'center'}}>{totalExpenseCount}</Text>
        <Text style={{textAlign: 'center'}}>Expenses</Text>
      </View>
    </View>
  );
};

export default Chart;
