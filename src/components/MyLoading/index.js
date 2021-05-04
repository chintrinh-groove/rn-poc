import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {styles} from './styles';

export const MyLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};
