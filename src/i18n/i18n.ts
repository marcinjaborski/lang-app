import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./resources_en";
import { pl } from "./resources_pl";

export const defaultNS = "shared";
export const resources = {
  en,
  pl,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    lng: "en",
    fallbackLng: "en",
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then();
