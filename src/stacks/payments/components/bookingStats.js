import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const width = Dimensions.get('window').width;
// each value represents a goal ring in Progress chart
const data = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.4, 0.6, 0.8],
};

const commitsData = [
  {date: '2017-01-02', count: 1},
  {date: '2017-01-03', count: 2},
  {date: '2017-01-04', count: 3},
  {date: '2017-01-05', count: 4},
  {date: '2017-01-06', count: 5},
  {date: '2017-01-30', count: 2},
  {date: '2017-01-31', count: 3},
  {date: '2017-03-01', count: 2},
  {date: '2017-04-02', count: 4},
  {date: '2017-03-05', count: 2},
  {date: '2017-02-30', count: 4},
];

const chartConfig = {
  backgroundGradientFrom: '#591282',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#219CAB',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Stats = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <ProgressChart
        data={data}
        width={width * 0.48}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
      />

      <ContributionGraph
        values={commitsData}
        endDate={new Date('2017-04-01')}
        numDays={105}
        width={width * 0.48}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};
export default Stats;
