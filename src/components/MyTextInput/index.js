import React, {useState} from 'react';
import {View, TextInput, Pressable, Text} from 'react-native';

import {styles} from './styles';
import EyeSvg from '../../assets/components/MyTextInput/eye.svg';
import NoEyeSvg from '../../assets/components/MyTextInput/noeye.svg';

export const MyTextInput = ({
  value = '',
  onChangeText = () => {},
  onBlur = () => {},
  placeholder = '',
  secureTextEntry = false,
  ...rest
}) => {
  const [secure, setSecure] = useState(secureTextEntry);

  const toggle = () => setSecure(prevState => !prevState);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
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
    </View>
  );
};
