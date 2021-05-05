import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const MyCustomDrawerContent = props => {
  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};
