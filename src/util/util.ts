import { ZERO_WIDTH_SPACE } from "@src/util/constants";
import { Editor, Transforms } from "slate";
import { axiosDeepl } from "./axios";
import { DeeplLanguage, Language } from "@src/@types";

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

export const insertTerm = (editor: Editor, separator: string) => {
  Transforms.insertNodes(editor, [
    {
      type: "term",
      text: `${ZERO_WIDTH_SPACE}${separator}`,
    },
  ]);
  Transforms.move(editor, { distance: separator.length, unit: "offset", reverse: true });
};
