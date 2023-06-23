import { Record } from "pocketbase";
import { Language } from "./types";

export type Note = Record & {
  title: string;
  content: string;
  excerpt: string;
  owner: string;
  baseLang: Language;
  targetLang: Language;
  module: string;
  expand: {
    module?: Module;
    "terms(note)": Term[];
  };
};

export type Module = Record & {
  name: string;
  owner: string;
  expand: {
    "notes(module)"?: Note[];
  };
};

export type Term = Record & {
  base: string;
  translation: string;
  owner: string;
  expand: {
    note?: Note;
  };
};

export type NoteToCreate = {
  title: string;
  owner: string;
  module?: string;
  content?: string;
  excerpt?: string;
  baseLang?: Language;
  targetLang?: Language;
};

export type ModuleToCreate = {
  name: string;
  owner: string;
};

export type TermToCreate = {
  base: string;
  translation: string;
  owner: string;
  note: string;
};
