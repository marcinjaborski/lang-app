import { DeeplLanguage, Language } from "./types";
import { axiosDeepl } from "./axios";
import { Editor, Transforms } from "slate";

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

export const translateText = async (editor: Editor, baseLang: Language, targetLang: Language) => {
  let selectedText = Editor.string(editor, editor.selection!);
  if (selectedText === "") {
    Transforms.move(editor, { distance: 1, unit: "word", reverse: true, edge: "anchor" });
    selectedText = Editor.string(editor, editor.selection!);
  }
  const translatedText = await translate(selectedText, baseLang, targetLang);
  Transforms.collapse(editor, { edge: "focus" });
  Transforms.insertText(editor, ` - ${translatedText}`);
};
