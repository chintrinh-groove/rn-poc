import React from 'react';
import {View, Text, TextInput} from 'react-native';

import {styles} from './styles';

export const MyTextInput = ({
  value = '',
  onChangeText = () => {},
  placeholder = '',
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
