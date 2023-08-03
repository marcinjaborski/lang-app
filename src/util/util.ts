import { DeeplResponse, Language } from "@src/types";
import { Node } from "slate";
import { axiosDeepl } from "./axios";

export const translate = async (text: string, sourceLang: Language, targetLang: Language) => {
  const response = await axiosDeepl.get<DeeplResponse>("", {
    params: {
      text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    },
  });
  return response.data.translations[0].text;
};

export const serialize = (noteContent: string): string => {
  try {
    return JSON.parse(noteContent)
      .map((n: Node) => Node.string(n))
      .join("\n");
  } catch (e) {
    return "";
  }
};
