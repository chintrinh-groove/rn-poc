import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import {initReactI18next, useTranslation} from 'react-i18next';
import i18n from 'i18next';
import translationEN from '../../assets/languages/en.json';
import translationVI from '../../assets/languages/vi.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
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
  };

  return (
    <LanguageContext.Provider value={{language, selectLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
