import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../../constants';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
  },
  primaryText: {
    color: PRIMARY_COLOR,
  },
  primary: {
    backgroundColor: PRIMARY_COLOR,
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
});
