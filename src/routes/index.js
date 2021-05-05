import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {LoginScreen, RegisterScreen, AppScreen} from '../screens';
import {LOGIN, REGISTER, APP_DRAWER, APP} from '../constants';
import {fbAuth} from '../firebase';
import {MyLoading, MyCustomDrawerContent} from '../components';
import GrooveLogo from '../assets/logo/groove.png';

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#d9d9d9'},
  headerTitle: () => (
    <Image style={{width: 500 / 5, height: 174 / 5}} source={GrooveLogo} />
  ),
  headerTitleStyle: {flex: 1, textAlign: 'center'},
};

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator
    initialRouteName={APP}
    screenOptions={globalScreenOptions}
    drawerContent={MyCustomDrawerContent}>
    <Drawer.Screen name={APP} component={AppScreen} />
  </Drawer.Navigator>
);

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
      }}
      screenOptions={{
        headerShown: false,
      }}>
      {!user ? (
        <>
          <Stack.Screen name={LOGIN} component={LoginScreen} />
          <Stack.Screen name={REGISTER} component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={APP_DRAWER} component={AppDrawer} />
        </>
      )}
    </Stack.Navigator>
  );
};
