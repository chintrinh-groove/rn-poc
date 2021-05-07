import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ArrowSVG} from '../../assets';
import {MySwitch, MyText} from '../../components';
import {PLACEHOLDER_AVATAR} from '../../constants';
import {useMyTheme} from '../../context';
import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const SettingScreen = () => {
  const {colors} = useTheme();
  const {isDark, setIsDark, toggleColor} = useMyTheme();

  const navigateTheme = () => {
    toggleColor();
  };

  const openLanguageModal = () => {};

  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row}>
        <View style={styles.informationContainer}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50 / 2}}
            source={{uri: PLACEHOLDER_AVATAR}}
          />
          <View style={styles.detailContainer}>
            <MyText primary>Trinh Chin Chin</MyText>
            <MyText>+84 704498756</MyText>
          </View>
        </View>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
      <View style={styles.row}>
        <MyText>Dark Mode</MyText>
        <MySwitch
          value={isDark}
          onValueChange={({name, value}) => setIsDark(value)}
        />
      </View>
      <TouchableOpacity style={styles.row} onPress={navigateTheme}>
        <MyText>Appearance</MyText>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={openLanguageModal}>
        <MyText>Language</MyText>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={logout}>
        <MyText>Log out</MyText>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};
