import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function LogoutSVG(props) {
  const {fill = '#000'} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}>
      <Path d="M16 9V5l8 7-8 7v-4H8V9h8zm-2 10v-.083A7.93 7.93 0 0110 20c-4.411 0-8-3.589-8-8s3.589-8 8-8a7.93 7.93 0 014 1.083V2.838A9.957 9.957 0 0010 2C4.478 2 0 6.477 0 12s4.478 10 10 10a9.957 9.957 0 004-.838V19z" />
    </Svg>
  );
}
