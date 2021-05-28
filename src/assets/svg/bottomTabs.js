import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width, tabBarHeight} = props;
  return (
    <Svg
      width={width}
      height={tabBarHeight}
      viewBox={`0 0 ${width} ${tabBarHeight}`}
      fill="none"
      {...props}>
      <Path
        d={`M${width} 0v60H0V0h126c37 0 32 37 62 39s27.207-38 61-38h132z`}
        // d={`M${width} 0v57H0V0h117c37 0 32 37 61 38s37.207-38 61-38h132z`}
        fill="#fff"
      />
      {props.children}
    </Svg>
  );
}

export default SvgComponent;
