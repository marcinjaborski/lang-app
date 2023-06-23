import { DeeplLanguage, Language } from "@src/types";
import { axiosDeepl } from "./axios";

export const translate = async (text: string, sourceLang: Language, targetLang: Language) => {
  const response = await axiosDeepl.get("", {
    params: {
      text: text,
      source_lang: toDeeplCode(sourceLang),
      target_lang: targetLang,
    },
  });
  return response.data.translations[0].text;
};

const toDeeplCode = (lng: Language): DeeplLanguage => {
  switch (lng) {
    case "gb":
      return "en";
    default:
      return lng;
  }
};
