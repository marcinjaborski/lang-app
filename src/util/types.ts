import { Record } from "pocketbase";

export type Note = Record & {
  title: string;
  content: string;
  excerpt: string;
  owner: string;
  baseLang: string;
  targetLang: string;
  expand: {
    module?: Module;
  };
};

export type Module = Record & {
  name: string;
  owner: string;
  notes: string[];
  expand: {
    "notes(module)"?: Note[];
  };
};

export type NoteToCreate = {
  title: string;
  owner: string;
  module?: string;
  content?: string;
  excerpt?: string;
  baseLang?: string;
  targetLang?: string;
};

export type ModuleToCreate = {
  name: string;
  owner: string;
};

export const languages = ["pl", "gb", "fr", "es", "it", "de"] as const;
export type Language = (typeof languages)[number];
