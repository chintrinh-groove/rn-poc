import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import {fbAuth} from '../../firebase';

import {styles} from './styles';

export const AppScreen = () => {
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled,
  );

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

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
      <Button title="Toggle Crashlytics" onPress={toggleCrashlytics} />
      <Button title="Crash" onPress={() => crashlytics().crash()} />
      <Text>Crashlytics is currently {enabled ? 'enabled' : 'disabled'}</Text>
    </View>
  );
};
