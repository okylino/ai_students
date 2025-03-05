import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE } from '@/enums/language';

import resources, { languageList } from './locales/resources';

const i18nInstance = i18n.createInstance();
i18nInstance
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<InitOptions>({
    resources,
    fallbackLng: LANGUAGE.EN,
    supportedLngs: languageList,
    load: 'languageOnly',
    react: { useSuspense: true },
    detection: { convertDetectedLanguage: (lng: string) => lng.split('-')[0] },
  });

export default i18nInstance;

i18nInstance.on('languageChanged', (lang) => {
  document.documentElement.lang = lang;
  document.documentElement.dir = i18nInstance.dir();
});
