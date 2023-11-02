import { AppLanguage } from "@src/i18n/types";
import { AppColor, Language } from "@src/types";

export const ZERO_WIDTH_SPACE = "​";
export const QUIZ_QUESTIONS = 10;
export const QUIZ_ANSWERS = 4;
export const PB_CUSTOM_ROUTES = "/hooks";
export const DEFAULT_LANG = "en" as AppLanguage;
export const DEFAULT_APP_COLOR = "GREEN" as AppColor;
export const DEFAULT_BASE_LANG = "en" as Language;
export const DEFAULT_TRANSLATION_LANG = "es" as Language;
export const DEFAULT_SEPARATOR = " > ";

export const LOCAL_STORAGE = {
  APP_COLOR: "localStorageKeyAppColor",
} as const;
