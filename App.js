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
import remoteConfig from '@react-native-firebase/remote-config';

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

  useEffect(async () => {
    remoteConfig()
      .setConfigSettings({
        minimumFetchIntervalMillis: 30000,
        isDeveloperModeEnabled: __DEV__,
      })
      .then(() =>
        remoteConfig()
          .setDefaults({
            language: 0,
            pirmary: 0,
            dark: 0,
          })
          .then(() =>
            remoteConfig()
              .fetchAndActivate()
              .then(activated => {
                if (!activated) console.log('Remote Config not activated');
                return remoteConfig().fetch();
              }),
          )
          .then(async fetchedRemotely => {
            if (fetchedRemotely) {
              console.log(
                'Configs were retrieved from the backend and activated.',
              );
            } else {
              console.log(
                'No configs were fetched from the backend, and the local configs were already activated',
              );
            }
          }),
      );
  }, []);

  return (
    <SafeAreaProvider>
      <NetInfoProvider>
        <MyThemeProvider>
          <LanguageProvider>
            <AppStack />
          </LanguageProvider>
        </MyThemeProvider>
      </NetInfoProvider>
    </SafeAreaProvider>
  );
};

export default App;
