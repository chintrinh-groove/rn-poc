import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {ArrowSVG} from '../../assets';
import {MySwitch, MyText, MyModal} from '../../components';
import {APPEARANCE, PLACEHOLDER_AVATAR} from '../../constants';
import {useLanguage, useMyTheme} from '../../context';
import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const SettingScreen = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {isDark, selectDark} = useMyTheme();
  const {selectedLanguageName, openLanguageModal} = useLanguage();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateTheme = () => navigation.navigate(APPEARANCE);

  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
      closeModal();
    });
  };

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  const darkModeT = t('src.screens.setting.DM');
  const appearanceT = t('src.screens.setting.App');
  const languageT = t('src.screens.setting.Lan');
  const viT = t('src.screens.setting.Vi');
  const enT = t('src.screens.setting.En');
  const logoutT = t('src.screens.setting.LO');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row}>
        <View style={styles.informationContainer}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50 / 2}}
            source={{uri: PLACEHOLDER_AVATAR}}
          />
          <View style={styles.detailContainer}>
            <MyText h5 bold primary>
              Trinh Chin Chin
            </MyText>
            <MyText p>+84 704498756</MyText>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <ArrowSVG fill={colors.text} width={16} height={16} />
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <MyText>{darkModeT}</MyText>
        <MySwitch
          value={isDark}
          onValueChange={({name, value}) => selectDark(value)}
        />
      </View>
      <TouchableOpacity style={styles.row} onPress={navigateTheme}>
        <MyText>{appearanceT}</MyText>
        <View style={styles.iconContainer}>
          <ArrowSVG fill={colors.text} width={16} height={16} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={openLanguageModal}>
        <MyText>{languageT}</MyText>
        <View style={styles.languageContainer}>
          <MyText>{selectedLanguageName === 'vietnam' ? viT : enT}</MyText>
          <View style={styles.iconContainer}>
            <ArrowSVG fill={colors.text} width={16} height={16} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={openModal}>
        <MyText>{logoutT}</MyText>
        <View style={styles.iconContainer}>
          <ArrowSVG fill={colors.text} width={16} height={16} />
        </View>
      </TouchableOpacity>

      <MyModal
        visible={modalVisible}
        onRequestClose={closeModal}
        onRequestSubmit={logout}
      />
    </View>
  );
};
