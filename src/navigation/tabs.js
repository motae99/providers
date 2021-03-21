import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Category from 'stacks/home';
import Social from 'social/index';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Social" component={Social} />
    </Tab.Navigator>
  );
};
export default BottomTabs;
