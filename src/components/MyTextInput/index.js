import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {styles} from './styles';
import EyeSvg from '../../assets/components/MyTextInput/eye.svg';
import NoEyeSvg from '../../assets/components/MyTextInput/noeye.svg';

export const MyTextInput = ({
  value = '',
  onChangeText = () => {},
  placeholder = '',
  secureTextEntry = false,
  ...rest
}) => {
  const [secure, setSecure] = useState(secureTextEntry);

  const toggle = () => setSecure(prevState => !prevState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
      {secureTextEntry && (
        <Pressable onPress={toggle}>
          {secure ? (
            <NoEyeSvg width={20} height={20} />
          ) : (
            <EyeSvg width={20} height={20} />
          )}
        </Pressable>
      )}
    </View>
  );
};
