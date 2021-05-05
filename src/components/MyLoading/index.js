import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {PRIMARY_COLOR} from '../../constants';

import {styles} from './styles';

export const MyLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={PRIMARY_COLOR} />
    </View>
  );
};
