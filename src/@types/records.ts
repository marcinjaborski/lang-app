import { Language } from "@src/@types";
import { Record } from "pocketbase";

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
};
