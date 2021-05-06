import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ArrowSVG} from '../../assets';
import {MySwitch} from '../../components';

import {PLACEHOLDER_AVATAR} from '../../constants';
import {styles} from './styles';

export const SettingScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {};

  const navigateTheme = () => {};

  const openLanguageModal = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row}>
        <View style={styles.informationContainer}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50 / 2}}
            source={{uri: PLACEHOLDER_AVATAR}}
          />
          <View style={styles.detailContainer}>
            <Text>Trinh Chin Chin</Text>
            <Text>+84 704498756</Text>
          </View>
        </View>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
      <View style={styles.row}>
        <Text>Dark Mode</Text>
        <MySwitch
          value={darkMode}
          onValueChange={({name, value}) => setDarkMode(value)}
        />
      </View>
      <TouchableOpacity style={styles.row} onPress={navigateTheme}>
        <Text>Appearance</Text>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={openLanguageModal}>
        <Text>Language</Text>
        <ArrowSVG fill="#00000076" width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};
