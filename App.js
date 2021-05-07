/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppStack} from './src/routes';
import {
  NetInfoProvider,
  LanguageProvider,
  MyThemeProvider,
} from './src/context';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaProvider>
      <NetInfoProvider>
        <LanguageProvider>
          <MyThemeProvider>
            <AppStack />
          </MyThemeProvider>
        </LanguageProvider>
      </NetInfoProvider>
    </SafeAreaProvider>
  );
};

export default App;
