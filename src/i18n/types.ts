import { resources } from "@src/i18n/i18n";

import { en } from "./resources_en";

export type Resource = typeof en;

export type AppLanguage = keyof typeof resources;
