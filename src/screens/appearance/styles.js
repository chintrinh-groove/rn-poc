import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  header: {marginBottom: 16},
  colorContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 50 / 10,
    marginRight: 50 / 5,
    marginBottom: 50 / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
