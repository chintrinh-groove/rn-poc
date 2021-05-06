import {StyleSheet} from 'react-native';

import {ALERT_COLOR} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
  },
  errorText: {
    color: ALERT_COLOR,
  },
});
