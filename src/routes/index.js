import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';

import {LoginScreen, RegisterScreen, AppScreen} from '../screens';
import {LOGIN, REGISTER, APP} from '../constants';
import {fbAuth} from '../firebase';
import {MyLoading} from '../components';

const Stack = createStackNavigator();

export const AppStack = () => {
  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = authUser => {
    // console.log(authUser);
    setUser(authUser);
    if (initializing) setInitializing(false);

    setLoading(false);
  };

  useEffect(() => {
    const subscriber = fbAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading) return <MyLoading />;

  return (
    <Stack.Navigator
      initialRouteName={LOGIN}
      onStateChange={async state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
      }}>
      {!user ? (
        <>
          <Stack.Screen name={LOGIN} component={LoginScreen} />
          <Stack.Screen name={REGISTER} component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={APP} component={AppScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
