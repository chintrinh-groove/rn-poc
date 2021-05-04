import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';

export const MyButton = ({
  title,
  containerStyle,
  type = 'primary',
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], containerStyle]}
      disabled={disabled}
      {...rest}>
      {title && (
        <Text
          style={[
            styles.buttonText,
            type === 'primary' ? styles.whiteText : styles.primaryText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
