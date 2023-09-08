import { AppLanguage } from "@src/i18n/types";
import { BaseModel, Record } from "pocketbase";

import { Language } from "./types";

export type UpdateRecord<R> = {
  id: string;
  record: Partial<R>;
};

export type User = BaseModel & {
  username: string;
  avatar: string | null;
  public: boolean;
  friends: string[];
  expand: {
    friends?: User[];
  };
};

export type SerializableUser = Pick<User, "id" | "username">;

export type Note = Record & {
  title: string;
  content: string;
  excerpt: string;
  owner: string;
  baseLang: Language;
  targetLang: Language;
  module: string;
  shared: string[];
  expand: {
    shared?: User[];
    module?: Module;
    "terms(note)"?: Term[];
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
  understanding: TermUnderstanding;
  note: string;
  expand: {
    note?: Note;
    tags?: Tag[];
  };
};

export type Settings = Record & {
  userLanguage: AppLanguage;
  separator: string;
  theme: null;
  defaultBaseLang: Language;
  defaultTargetLang: Language;
  user: string;
};

export type Tag = Record & {
  label: string;
  owner: string;
  color: string;
};

export type StudySet = Record & {
  title: string;
  owner: string;
  shared: string[];
  sharedId: string;
  expand: {
    shared?: User[];
    terms?: Term[];
  };
};

export type ScoreGameType = "quiz" | "match";

export type Score = Record & {
  user: string;
  game: ScoreGameType;
  score: number;
  studySetSharedId: string;
  expand: {
    user?: User;
  };
};

export type NoteToCreate = {
  title: string;
  module: string;
  shared?: string[];
  content?: string;
  excerpt?: string;
  baseLang?: Language;
  targetLang?: Language;
};

export type ModuleToCreate = {
  name: string;
};

export type TermToCreate = {
  base: string;
  translation: string;
  note: string;
  tags?: string[];
};

export type TagToCreate = {
  label: string;
  color?: string;
};

export type SettingsToCreate = {
  userLanguage?: AppLanguage;
  separator?: string;
  theme?: null;
  defaultBaseLang?: Language;
  defaultTargetLang?: Language;
};

export type StudySetToCreate = {
  title: string;
  terms: string[];
  shared: string[];
};

export type ScoreToCreate = {
  game: ScoreGameType;
  score: number;
  studySetSharedId: string;
};

export const UNDERSTANDING = {
  INITIAL: 0,
  1: 1,
  2: 2,
  FINAL: 3,
} as const;

export type TermUnderstanding = (typeof UNDERSTANDING)[keyof typeof UNDERSTANDING];
