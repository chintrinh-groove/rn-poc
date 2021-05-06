import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {fbAuth} from '../../firebase';

// import {styles} from './styles';

export const MyCustomDrawerContent = props => {
  const logout = () => {
    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        // icon={({color, size}) => (
        //   <Icon name="calendar-alt" color={color} size={size} solid />
        // )}
        label="LOGOUT"
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};
