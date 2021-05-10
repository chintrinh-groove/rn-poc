import React, {createContext, useContext, useState, useEffect} from 'react';
// import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
// import remoteConfig from '@react-native-firebase/remote-config';

import {PRIMARY_COLOR} from '../../constants';
// import {getRandomColor} from '../../utils';

const MyThemeContext = createContext();

// remoteConfig()
//   .setDefaults({
//     awesome_new_feature: 'disabled',
//   })
//   .then(() => remoteConfig().fetchAndActivate())
//   .then(fetchedRemotely => {
//     if (fetchedRemotely) {
//       console.log('Configs were retrieved from the backend and activated.');
//     } else {
//       console.log(
//         'No configs were fetched from the backend, and the local configs were already activated',
//       );
//     }
//   });

// const awesomeNewFeature = remoteConfig().getValue('awesome_new_feature');

// console.log(awesomeNewFeature.asString());

// if (awesomeNewFeature.getSource() === 'remote') {
//   console.log('Parameter value was from the Firebase servers.');
// } else if (awesomeNewFeature.getSource() === 'default') {
//   console.log('Parameter value was from a default value.');
// } else {
//   console.log('Parameter value was from a locally cached value.');
// }

export const MyThemeProvider = ({children}) => {
  // const scheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);
  const [color, setColor] = useState(PRIMARY_COLOR);
  const {getItem: getPrimary, setItem: setPrimary} = useAsyncStorage(
    '@primary',
  );
  const {getItem: getDark, setItem: setDark} = useAsyncStorage('@dark');

  useEffect(() => {
    (async () => {
      const primary = await getPrimary();
      primary && setColor(primary);
      const dark = await getDark();
      dark && setIsDark(JSON.parse(dark));
    })();
  }, []);

  const MyTheme = {
    primary: color,
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...MyTheme,

      // background: '#131313',
      // text: '#A1A1A1',
      // card: '#202020',

      // tabBar: '#131313',
      // floatingButton: '#A1A1A1',
      // disabled: '#131313',
      // thumbnail: '#A1A1A1',
      // editButton: '#A1A1A1',
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...MyTheme,
      // primary: 'rgb(255, 45, 85)',
      // background: 'rgb(242, 242, 242)',
      // card: 'rgb(255, 255, 255)',
      // text: 'rgb(28, 28, 30)',
      // border: 'rgb(199, 199, 204)',
      // notification: 'rgb(255, 69, 58)',
    },
  };

  const selectDark = mode => {
    setDark(JSON.stringify(mode));
    setIsDark(mode);
  };

  const selectPrimary = color => {
    setPrimary(color);
    setColor(color);
  };

  return (
    <MyThemeContext.Provider
      value={{isDark, selectDark, setIsDark, primary: color, selectPrimary}}>
      <NavigationContainer theme={isDark ? MyDarkTheme : MyLightTheme}>
        {children}
      </NavigationContainer>
    </MyThemeContext.Provider>
  );
};

export const useMyTheme = () => useContext(MyThemeContext);
