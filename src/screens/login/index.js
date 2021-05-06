import React from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {MyButton, MyTextInput} from '../../components';
import {fbAuth} from '../../firebase';
import {REGISTER} from '../../constants';
import {loginSchema} from '../../validation';

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
      <Text>LoginScreen</Text>

      <Controller
        control={control}
        render={({field: {onChange, onBlur, error, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
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
            onChangeText={value => onChange(value)}
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
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="confirm Password"
            secureTextEntry
          />
        )}
        name="confirmPwd"
        rules={{required: true}}
        defaultValue="12345678"
      />
      {errors.confirmPwd && (
        <Text style={styles.errorText}>{errors.confirmPwd.message}</Text>
      )}

      <MyButton title="Login" onPress={onSubmit} />
      <Pressable onPress={navigateRegister}>
        <Text>Register!</Text>
      </Pressable>
    </View>
  );
};
