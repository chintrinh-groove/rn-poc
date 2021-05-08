import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import {MyTextInput, MyButton, MyText} from '../../components';
import {LOGIN} from '../../constants';
import {fbAuth} from '../../firebase';
import {registerSchema} from '../../validation';

import {styles} from './styles';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

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

  const fullNameT = t('src.screens.register.FN');
  const passwordT = t('src.screens.register.Pa');
  const confirmPasswordT = t('src.screens.register.CP');
  const registerT = t('src.screens.register.Re');
  const loginT = t('src.screens.register.Lo');

  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MyTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={fullNameT}
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
        render={({field: {onChange, onBlur, value}}) => (
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
            placeholder={passwordT}
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
            placeholder={confirmPasswordT}
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

      <MyButton title={registerT} onPress={onSubmit} />
      <Pressable onPress={navigateLogin}>
        <MyText>{logi1nT}</MyText>
      </Pressable>
    </View>
  );
};
