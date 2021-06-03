import React from 'react';
import {Dimensions, View} from 'react-native';
const width = Dimensions.get('window').width;
import Svg, {Path} from 'react-native-svg';
const height = 25;
function SvgComponent(props) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        right: -width / 2,
        top: -1,
        zIndex: 10,
        width,
      }}>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        {...props}>
        <Path
          d={`M0 0h${width}v5H272c-24.5 4.286-61.5 20-85.5 20S122.5 5 99 5H0V0z`}
          fill={props.color}
        />

        <Path d="M200 11l-12.276 4L176 11" stroke="#867C7C" strokeWidth={5} />
      </Svg>
    </View>
  );
}

export default SvgComponent;
