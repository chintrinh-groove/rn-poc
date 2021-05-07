import React from 'react';
import {Image, View, Text, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {MyButton, MyTextInput, MyText} from '../../components';
import {fbAuth} from '../../firebase';
import {REGISTER} from '../../constants';
import {loginSchema} from '../../validation';
import GrooveLogo from '../../assets/logo/groove.png';

import {styles} from './styles';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema()),
  });

  const onSubmit = handleSubmit(async ({email, pwd}) => {
    try {
      const authUser = await fbAuth.signInWithEmailAndPassword(email, pwd);
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  const navigateRegister = () => navigation.navigate(REGISTER);

  return (
    <View style={styles.container}>
      <Image style={{width: 500 / 2, height: 174 / 2}} source={GrooveLogo} />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, error, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="email"
          />
        )}
        name="email"
        rules={{required: true}}
        defaultValue="trinhchinchin@gmail.com"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            secureTextEntry
          />
        )}
        name="pwd"
        rules={{required: true}}
        defaultValue="12345678"
      />
      {errors.pwd && <Text style={styles.errorText}>{errors.pwd.message}</Text>}

      <MyButton title="Login" onPress={onSubmit} primary />
      <Pressable onPress={navigateRegister}>
        <MyText>Register!</MyText>
      </Pressable>
    </View>
  );
};
