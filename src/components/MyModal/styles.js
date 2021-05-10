import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '80%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  headerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {flexDirection: 'row'},
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 16,
    height: 32,
  },
});
