import { Language } from "@src/types";
import { axiosDeepl } from "./axios";

export const translate = async (text: string, sourceLang: Language, targetLang: Language) => {
  const response = await axiosDeepl.get("", {
    params: {
      text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    },
  });
  return response.data.translations[0].text;
};
