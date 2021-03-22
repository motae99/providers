import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('window');

const SIZE = 64;
const ICON_SIZE = SIZE * 0.6;
const SPACING = 12;
const s = width * 0.64;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.5;
const RADIUS = 18;
const FULL_SIZE = s + SPACING * 2;
const PlannerDetail = ({route}) => {
  const {item, index} = route.params;
  return (
    <View style={{flex: 1}}>
      <SharedElement
        id={`item.${item.key}.image`}
        style={{width: width, height: height}}>
        <View style={[StyleSheet.absoluteFillObject, {borderRadius: 0}]}>
          <Image
            source={item.files[index].image}
            style={[{height: height, width: width, resizeMode: 'cover'}]}
          />
        </View>
      </SharedElement>

      <SharedElement id={`item.${item.key}.title`} style={styles.location}>
        <Text style={[styles.location]}>{item.name}</Text>
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: '#fff',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING * 3,
    left: SPACING * 2,
  },
});
PlannerDetail.sharedElements = (route, otherRoute, showing) => {
  const {index, item} = route.params;
  return [{id: `item.${item.key}.title`}, {id: `item.${item.key}.image`}];
};
export default PlannerDetail;
