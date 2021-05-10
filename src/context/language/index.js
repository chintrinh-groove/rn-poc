import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {initReactI18next, useTranslation} from 'react-i18next';
import i18n from 'i18next';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

import enTranslation from '../../assets/language/en.json';
import viTranslation from '../../assets/language/vi.json';
import {CheckSVG} from '../../assets';

import {styles} from './styles';

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
  const {getItem: getLanguage, setItem: setLanguage} = useAsyncStorage(
    '@language',
  );
  const {i18n} = useTranslation();
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
  const {colors} = useTheme();

  useLayoutEffect(() => {
    (async () => {
      const language = await getLanguage();
      // selectLanguage(language ?? Language.EN);
      selectLanguage(language ?? 'en');
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
        language: i18n.language,
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
                  {language.checked && <CheckSVG fill={colors.primary} />}
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
