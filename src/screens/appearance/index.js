import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {MyText} from '../../components';
import {useMyTheme} from '../../context';
import {CheckSVG} from '../../assets';

import {styles} from './styles';

const colors = [
  '#f5222d',
  '#fa541c',
  '#fa8c16',
  '#faad14',
  '#fadb14',
  '#a0d911',
  '#52c41a',
  '#13c2c2',
  '#1890ff',
  '#2f54eb',
  '#722ed1',
  '#eb2f96',
];

export const AppearanceScreen = () => {
  const {primary, setPrimary} = useMyTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyText h5 bold>
          Favorite color
        </MyText>
      </View>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, {backgroundColor: color}]}
            onPress={() => setPrimary(color)}>
            {primary === color && <CheckSVG fill={'#000'} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
