import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {styles} from './styles';

export const MyButton = ({
  title,
  containerStyle,
  type = 'primary',
  disabled = false,
  primary,
  ...rest
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {borderColor: colors.primary, borderWidth: 1},
        styles.button,
        containerStyle,
        primary && {
          backgroundColor: colors.primary,
        },
      ]}
      disabled={disabled}
      {...rest}>
      {title && (
        <Text style={[{color: colors.text}, styles.buttonText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
