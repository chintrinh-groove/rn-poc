import React from 'react';
import {useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyTextInput, MyButton} from '../../components';
import {LOGIN} from '../../constants';
import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('Trinh Chin Chin');
  const [email, setEmail] = useState('trinhchinchin@gmail.com');
  const [pwd, setPwd] = useState('12345678');

  const hanldeRegister = async () => {
    try {
      const authUser = await fbAuth.createUserWithEmailAndPassword(email, pwd);

      authUser &&
        authUser.user.updateProfile({
          displayName: fullName,
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const navigateLogin = () => navigation.navigate(LOGIN);

  const disabled =
    fullName.length === 0 || email.length === 0 || pwd.length === 0;

  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
      <MyTextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="fullName"
      />
      <MyTextInput value={email} onChangeText={setEmail} placeholder="email" />
      <MyTextInput
        value={pwd}
        onChangeText={setPwd}
        placeholder="password"
        secureTextEntry
      />
      <MyButton title="Register" onPress={hanldeRegister} disabled={disabled} />
      <Pressable onPress={navigateLogin}>
        <Text>Login!</Text>
      </Pressable>
    </View>
  );
};
