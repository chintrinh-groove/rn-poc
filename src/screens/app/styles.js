import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 16,
  },
  noInternetContainer: {alignItems: 'center'},
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 24,
    width: '100%',
  },
  youtubeContainer: {
    alignSelf: 'stretch',
    width: width,
    height: (width * 3) / 4,
  },
  row: {marginVertical: 8, flexDirection: 'row'},
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
});
