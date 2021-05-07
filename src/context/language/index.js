import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {initReactI18next, useTranslation} from 'react-i18next';
import i18n from 'i18next';

import enTranslation from '../../assets/language/en.json';
import viTranslation from '../../assets/language/vi.json';
import {CheckSVG} from '../../assets';
import {PRIMARY_COLOR} from '../../constants';
// import {styles} from '../../screens/sample/styles';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: enTranslation,
  },
  vi: {
    translation: viTranslation,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    // keySeparator: false, // we do not use keys in form messages.welcome

    // do not load a fallback
    fallbackLng: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const {i18n} = useTranslation();
  const [language, setLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);
  const [languages, setLanguages] = useState([
    {
      id: 'en',
      value: 'english',
      checked: true,
    },
    {
      id: 'vi',
      value: 'vietnam',
      checked: false,
    },
  ]);

  useLayoutEffect(() => {
    (async () => {
      //   const language = await getLanguage();
      //   selectLanguage(language ?? Language.EN);
      selectLanguage(language);
    })();
  }, [i18n]);

  const selectLanguage = id => {
    i18n.changeLanguage(id);
    setLanguage(id);
    setLanguages(prevState =>
      prevState?.map(language => ({
        ...language,
        checked: language.id === id ? true : false,
      })),
    );
  };

  const openLanguageModal = () => setModalVisible(true);

  const closeLanguageModal = () => setModalVisible(false);

  const selectedLanguageName = languages.find(
    language => language.checked === true,
  )?.value;

  return (
    <LanguageContext.Provider
      value={{
        language,
        selectLanguage,
        modalVisible,
        openLanguageModal,
        closeLanguageModal,
        selectedLanguageName,
      }}>
      {children}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeLanguageModal}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={closeLanguageModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {languages.map((language, index) => (
              <View key={language.id}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => selectLanguage(language.id)}>
                  <Text>{language.value}</Text>
                  {language.checked && <CheckSVG fill={PRIMARY_COLOR} />}
                </TouchableOpacity>
                {index !== languages.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  divider: {
    borderTopColor: '#d3d3d3',
    borderTopWidth: 1,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
});
