import React from 'react';
import {View, Text, Button} from 'react-native';
import analytics from '@react-native-firebase/analytics';

import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const AppScreen = () => {
  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  return (
    <View style={styles.container}>
      <Text>AppScreen</Text>
      <Button onPress={logout} title="Logout" />
      <Button
        title="Add To Basket"
        onPress={async () =>
          await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
      />
    </View>
  );
};
