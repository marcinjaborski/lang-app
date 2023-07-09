import { useSettingsRepository } from "@src/hooks/useSettingsRepository";
import { AppLanguage } from "@src/i18n/types";
import { Language } from "@src/types";

export type UserSettings = {
  language: AppLanguage;
  separator: string;
  baseLang: Language;
  targetLang: Language;
};

export const DEFAULT_LANG = "en";
export const DEFAULT_TRANSLATION_LANG = "es";
export const DEFAULT_SEPARATOR = " > ";

export const useSettings = (): UserSettings => {
  const settingsRepository = useSettingsRepository();
  const settings = settingsRepository.view.data;
  if (!settings)
    return {
      language: DEFAULT_LANG,
      separator: DEFAULT_SEPARATOR,
      baseLang: DEFAULT_LANG,
      targetLang: DEFAULT_TRANSLATION_LANG,
    };

  return {
    language: settings.userLanguage || DEFAULT_LANG,
    separator: settings.separator || DEFAULT_SEPARATOR,
    baseLang: settings.defaultBaseLang || DEFAULT_LANG,
    targetLang: settings.defaultTargetLang || DEFAULT_TRANSLATION_LANG,
  };
};
