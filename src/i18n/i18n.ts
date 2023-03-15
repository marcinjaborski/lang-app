import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { resources_en } from "./resources_en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: resources_en,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18n;
