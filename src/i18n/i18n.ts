import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { resources_en } from "./resources_en";
import { resources_pl } from "./resources_pl";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: resources_en,
      pl: resources_pl,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18n;
