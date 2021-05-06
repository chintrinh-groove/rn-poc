import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ActiveBuilding, Building, ActiveGearSVG, GearSVG} from '../../assets';
import {PRIMARY_COLOR} from '../../constants';

import {styles} from './styles';

export function MyTabBar({state, descriptors, navigation}) {
  return (
    <SafeAreaView style={[styles.safeView]} edges={['bottom']}>
      <View style={styles.bottomTabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const renderTabIcon = ({index, isFocused}) => {
            switch (index) {
              case 0:
                return isFocused ? (
                  <ActiveBuilding fill={PRIMARY_COLOR} />
                ) : (
                  <Building fill={`${PRIMARY_COLOR}76`} />
                );
              case 1:
                return isFocused ? (
                  <ActiveGearSVG fill={PRIMARY_COLOR} />
                ) : (
                  <GearSVG fill={`${PRIMARY_COLOR}76`} />
                );
              default:
                return null;
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.bottomTabButton}>
              {renderTabIcon({index, isFocused})}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
