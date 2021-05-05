import React from 'react';
import {useState} from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyButton, MyTextInput} from '../../components';
import {fbAuth} from '../../firebase';
import {REGISTER} from '../../constants';

import {styles} from './styles';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('trinhchinchin@gmail.com');
  const [pwd, setPwd] = useState('12345678');

  const handlePress = async () => {
    try {
      const authUser = await fbAuth.signInWithEmailAndPassword(email, pwd);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const navigateRegister = () => navigation.navigate(REGISTER);

  const disabled = email.length === 0 || pwd.length === 0;

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <MyTextInput value={email} onChangeText={setEmail} placeholder="email" />
      <MyTextInput
        value={pwd}
        onChangeText={setPwd}
        placeholder="password"
        secureTextEntry
      />
      <MyButton title="Login" onPress={handlePress} disabled={disabled} />
      <Pressable onPress={navigateRegister}>
        <Text>Register!</Text>
      </Pressable>
    </View>
  );
};
