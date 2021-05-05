import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './styles';

export const AppScreen = () => {
  const {colors} = useTheme();

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: colors.text}}>AppScreen</Text>
      {/* <Button
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
      <Text>Crashlytics is currently {enabled ? 'enabled' : 'disabled'}</Text> */}
    </SafeAreaView>
  );
};
