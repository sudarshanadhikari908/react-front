import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import {defaultLanguage, availableLanguage} from './config/env_config.json';
import { translationResources } from "./config/trans_Config";


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources: translationResources,
    lang: defaultLanguage,
    fallbackLng: defaultLanguage,
    whitelist:availableLanguage,
    keySeparator: ".",
    detection: {
      order: [ "cookie", "localStorage", "htmlTag"],
      caches: ["cookie"],
    },
   
    interpolation: {
      escapeValue: false,
    },
    // react i18next special options (optional)
    react: {
      useSuspense: false,
      // wait: false,
    },
  });
export default i18n;
