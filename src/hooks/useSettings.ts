import { useSettingsRepository } from "@src/hooks/useSettingsRepository";
import { AppLanguage } from "@src/i18n/types";
import { Language } from "@src/types";
import { useMemo } from "react";

export type UserSettings = {
  language: AppLanguage;
  separator: string;
  baseLang: Language;
  targetLang: Language;
};

export const DEFAULT_LANG = "en" as AppLanguage;
export const DEFAULT_BASE_LANG = "en" as Language;
export const DEFAULT_TRANSLATION_LANG = "es" as Language;
export const DEFAULT_SEPARATOR = " > ";

export const useSettings = (): UserSettings | null => {
  const settingsRepository = useSettingsRepository();
  const settings = settingsRepository.view.data;

  return useMemo(() => {
    if (settingsRepository.view.isLoading) return null;

    if (!settings)
      return {
        language: DEFAULT_LANG,
        separator: DEFAULT_SEPARATOR,
        baseLang: DEFAULT_BASE_LANG,
        targetLang: DEFAULT_TRANSLATION_LANG,
      };

    return {
      language: settings.userLanguage || DEFAULT_LANG,
      separator: settings.separator || DEFAULT_SEPARATOR,
      baseLang: settings.defaultBaseLang || DEFAULT_BASE_LANG,
      targetLang: settings.defaultTargetLang || DEFAULT_TRANSLATION_LANG,
    };
  }, [settings, settingsRepository.view.isError]);
};
