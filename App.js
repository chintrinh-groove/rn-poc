/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';
import SplashScreen from 'react-native-splash-screen';

import {AppStack} from './src/routes';

const App: () => Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
