import React from 'react';
import {Modal, View, TouchableWithoutFeedback, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {MyText} from '../MyText';

import {styles} from './styles';

export const MyModal = ({visible, onRequestClose, onRequestSubmit}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const doYouWantToLogoutT = t('src.components.MyModal.DYWTL');
  const cancelT = t('src.components.MyModal.Ca');
  const logoutT = t('src.components.MyModal.LO');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <MyText h5 bold>
              {doYouWantToLogoutT}
            </MyText>
          </View>
          <View style={styles.contentContainer}>
            <Pressable style={styles.cancelButton} onPress={onRequestClose}>
              <MyText h5 color={colors.primary}>
                {cancelT}
              </MyText>
            </Pressable>
            <Pressable
              style={[styles.submitButton, {backgroundColor: colors.primary}]}
              onPress={onRequestSubmit}>
              <MyText h5 color="#fff">
                {logoutT}
              </MyText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
