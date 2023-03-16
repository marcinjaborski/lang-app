import { Record } from "pocketbase";

export type Note = Record & {
  title: string;
  content: string;
  excerpt: string;
  owner: string;
  baseLang: string;
  targetLang: string;
};

export type Module = Record & {
  name: string;
  owner: string;
  notes: string[];
  expand?: {
    notes: Note[];
  };
};
