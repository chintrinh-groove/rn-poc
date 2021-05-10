import React from 'react';
import {
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/core';

import {fbAuth} from '../../firebase';
import {LogoutSVG, BuildingSVG, GearSVG} from '../../assets';
import {APP, SETTING} from '../../constants';

// import {styles} from './styles';

export const MyCustomDrawerContent = props => {
  const navigation = useNavigation();

  const navigateApp = () => navigation.navigate(APP);

  const navigateSetting = () => navigation.navigate(SETTING);

  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        icon={({color, size}) => <BuildingSVG fill={color} size={size} />}
        label={APP}
        onPress={navigateApp}
      />
      <DrawerItem
        icon={({color, size}) => <GearSVG fill={color} size={size} />}
        label={SETTING}
        onPress={navigateSetting}
      />
      <DrawerItem
        icon={({color, size}) => <LogoutSVG fill={color} size={size} />}
        label="LOGOUT"
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};
