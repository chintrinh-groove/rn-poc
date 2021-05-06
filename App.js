/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppStack} from './src/routes';
import {NetInfoProvider, LanguageProvider} from './src/context';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = () => {
  const scheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaProvider>
      <NetInfoProvider>
        <LanguageProvider>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
            <AppStack />
          </NavigationContainer>
        </LanguageProvider>
      </NetInfoProvider>
    </SafeAreaProvider>
  );
};

export default App;
