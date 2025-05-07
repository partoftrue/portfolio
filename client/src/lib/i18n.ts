import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "@/locales/en.json";
import koTranslation from "@/locales/ko.json";

// Get user's preferred language from localStorage or use browser language
const getUserLanguage = () => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    return savedLanguage;
  }
  
  const browserLang = navigator.language.split("-")[0];
  return ["en", "ko"].includes(browserLang) ? browserLang : "en";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ko: {
        translation: koTranslation
      }
    },
    lng: getUserLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
