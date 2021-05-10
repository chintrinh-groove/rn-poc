import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {styles} from './styles';

export const MyLoading = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};
