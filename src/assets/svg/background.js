import * as React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
function SvgComponent(props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={[0, 0, width, height].join(' ')}
      fill="none"
      {...props}>
      <Path fill="url(#paint0_linear)" d="M0 0H699V1306H0z" />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={349.5}
          y1={0}
          x2={349.5}
          y2={1306}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D875FB" />
          <Stop offset={0.421875} stopColor="#7AF1EA" stopOpacity={0.55} />
          <Stop offset={0.824271} stopColor="#D97FF9" stopOpacity={0.5} />
        </LinearGradient>
      </Defs>
      {props.children}
    </Svg>
  );
}

export default SvgComponent;
