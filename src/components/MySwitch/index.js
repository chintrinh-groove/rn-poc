import React, {useRef} from 'react';
import {TouchableOpacity, Animated} from 'react-native';

import {PRIMARY_COLOR} from '../../constants';

import {styles} from './styles';

export const MySwitch = ({name, value, onValueChange = () => {}}) => {
  const offsetX = useRef(new Animated.Value(value ? 1 : 0)).current;

  Animated.timing(offsetX, {
    toValue: value ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();

  const traslateXInterpolate = offsetX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
    extrapolate: 'clamp',
  });

  const backgroundInterpolate = offsetX.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D8D8D8', PRIMARY_COLOR],
    extrapolate: 'clamp',
  });

  const toggleSwitch = () => {
    onValueChange({name, value: !value});
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: backgroundInterpolate,
          },
        ]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  translateX: traslateXInterpolate,
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
