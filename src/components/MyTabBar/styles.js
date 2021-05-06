import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#FFFFFF',

    shadowColor: '#007BFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
  bottomTabButton: {
    flex: 1,
    alignItems: 'center',
  },
});
