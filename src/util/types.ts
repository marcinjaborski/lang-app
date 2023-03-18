import { Record } from "pocketbase";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

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

export type DeeplLanguage = Omit<Language, "gb">;

export type ParagraphElement = {
  type: "paragraph";
  textAlign?: "left" | "right" | "center" | "justify";
  children: TextElement[];
};

export type TextElement = {
  text: string;
  isWord?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement;
    Text: TextElement;
  }
}
