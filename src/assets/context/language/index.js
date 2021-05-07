import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function CheckSVG(props) {
  const {fill = '#000'} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}>
      <Path d="M20.285 2L9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z" />
    </Svg>
  );
}
