import { DeeplResponse, isTermElement, Language, Note, Term, TermElement, UNDERSTANDING } from "@src/types";
import { pb } from "@src/util";
import { Editor, Node } from "slate";

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

export const isNoteShared = (note?: Note) => {
  return note && note.owner !== pb.authStore.model?.id;
};

export const getProgress = (terms: Term[] = []) => {
  if (!terms.length) return 0;
  const cumulativeUnderstanding = terms.reduce((acc, curr) => acc + curr.understanding, 0);
  const totalUnderstanding = terms.length * UNDERSTANDING.FINAL;
  return Math.floor((cumulativeUnderstanding / totalUnderstanding) * 100);
};

export const getAllNoteTerms = (editor: Editor): TermElement[] => {
  const [...noteTerms] = Editor.nodes<TermElement>(editor, {
    match: (node) => isTermElement(node),
    at: Editor.range(editor, []),
  });
  return noteTerms.map(([noteTerm]) => noteTerm);
};

export const mapLanguageToFlag = (lang: Language) => {
  return (lang === "en" ? "gb" : lang).toUpperCase();
};
