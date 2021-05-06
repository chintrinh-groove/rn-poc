import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {width: '100%'},
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#D4DAE4', // Add this to specify bottom border color
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
  },
});
