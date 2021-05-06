import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {MyTextInput, MyButton} from '../../components';
import {LOGIN} from '../../constants';
import {fbAuth} from '../../firebase';
import {registerSchema} from '../../validation';

import {styles} from './styles';

export const RegisterScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema()),
  });

  const onSubmit = handleSubmit(async ({email, pwd}) => {
    try {
      const authUser = await fbAuth.createUserWithEmailAndPassword(email, pwd);

      authUser &&
        authUser.user.updateProfile({
          displayName: fullName,
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  const navigateLogin = () => navigation.navigate(LOGIN);

  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>

      <Controller
        control={control}
        render={({field: {onChange, onBlur, error, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="fullName"
          />
        )}
        name="fullName"
        rules={{required: true}}
        defaultValue="Trinh Chin Chin"
      />
      {errors.fullName && (
        <Text style={styles.errorText}>{errors.fullName.message}</Text>
      )}
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
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="confirm password"
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

      <MyButton title="Register" onPress={onSubmit} />
      <Pressable onPress={navigateLogin}>
        <Text>Login!</Text>
      </Pressable>
    </View>
  );
};
