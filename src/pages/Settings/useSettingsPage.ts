import { useSettings, useSettingsRepository } from "@src/hooks";
import { AppLanguage } from "@src/i18n/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSettingsPage = () => {
  const { t, i18n } = useTranslation("settings");
  const settings = useSettings();
  const settingsRepository = useSettingsRepository();
  const [language, setLanguage] = useState(settings.language);
  const [baseLang, setBaseLang] = useState(settings.baseLang);
  const [targetLang, setTargetLang] = useState(settings.targetLang);
  const [separator, setSeparator] = useState(settings.separator);

  useEffect(() => {
    if (settingsRepository.view.isLoading || settingsRepository.view.data) return;
    if (settingsRepository.create.isLoading || settingsRepository.create.isError) return;
    settingsRepository.create.mutate({});
  }, [settingsRepository.view]);

  useEffect(() => {
    setLanguage(settings.language);
    setBaseLang(settings.baseLang);
    setTargetLang(settings.targetLang);
    setSeparator(settings.separator);
  }, [settingsRepository.view.data]);

  const onLangChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value as AppLanguage);
    await i18n.changeLanguage(event.target.value);
  };

  const onSave = () => {
    settingsRepository.update.mutate({
      userLanguage: language,
      separator,
      defaultBaseLang: baseLang,
      defaultTargetLang: targetLang,
    });
  };

  return {
    t,
    settings,
    settingsRepository,
    onLangChange,
    onSave,
    language,
    setLanguage,
    baseLang,
    setBaseLang,
    targetLang,
    setTargetLang,
    separator,
    setSeparator,
  };
};
