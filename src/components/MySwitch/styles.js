import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D8D8D8',
    width: 32,
    height: 20,
    borderRadius: 20 / 2,
    paddingHorizontal: 1,
    justifyContent: 'center',
  },
  activeContainer: {
    backgroundColor: PRIMARY_COLOR,
  },
  circle: {
    backgroundColor: '#FFFFFF',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
  },
});
