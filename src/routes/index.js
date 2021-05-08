import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';

import {
  LoginScreen,
  RegisterScreen,
  AppScreen,
  SettingScreen,
  AppearanceScreen,
} from '../screens';
import {
  LOGIN,
  REGISTER,
  APP_DRAWER,
  APP_TABS,
  APP,
  SETTING,
  APPEARANCE,
} from '../constants';
import {fbAuth} from '../firebase';
import {MyLoading, MyCustomDrawerContent, MyTabBar} from '../components';
import GrooveLogo from '../assets/logo/groove.png';
import {ActiveBuilding, Building, ActiveGearSVG, GearSVG} from '../assets';

const globalScreenOptions = colors => {
  return {
    headerTitle: () => (
      <Image
        style={{
          width: 500 / 5,
          height: 174 / 5,
        }}
        source={GrooveLogo}
        resizeMode="contain"
      />
    ),
    headerTitleStyle: {flex: 1, textAlign: 'center'},
    headerTintColor: colors.primary,
  };
};

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const AppDrawer = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName={APP}
      screenOptions={globalScreenOptions(colors)}
      drawerContent={props => <MyCustomDrawerContent {...props} />}>
      <Drawer.Screen name={APP_TABS} component={AppTabs} />
    </Drawer.Navigator>
  );
};

function AppTabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={APP}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: false,
      }}
      // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name={APP}
        component={AppScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <ActiveBuilding fill={color} size={size} />
            ) : (
              <Building fill={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name={SETTING}
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <ActiveGearSVG fill={color} size={size} />
            ) : (
              <GearSVG fill={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export const AppStack = () => {
  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = authUser => {
    // console.log(authUser);
    setLoading(true);
    setUser(authUser);
    if (initializing) setInitializing(false);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
          <Stack.Screen
            name={LOGIN}
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={REGISTER}
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={APP_DRAWER}
            component={AppDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={APPEARANCE}
            component={AppearanceScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
