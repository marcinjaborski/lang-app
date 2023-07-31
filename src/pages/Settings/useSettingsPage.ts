import { useSettings, useSettingsRepository, useTagsRepository } from "@src/hooks";
import { AppLanguage } from "@src/i18n/types";
import { showError, useAppDispatch } from "@src/store";
import { TagToCreate } from "@src/types";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSettingsPage = () => {
  const { t, i18n } = useTranslation("settings");
  const settings = useSettings();
  const settingsRepository = useSettingsRepository();
  const tagsRepository = useTagsRepository();
  const [language, setLanguage] = useState(settings.language);
  const [baseLang, setBaseLang] = useState(settings.baseLang);
  const [targetLang, setTargetLang] = useState(settings.targetLang);
  const [separator, setSeparator] = useState(settings.separator);
  const [tagLabel, setTagLabel] = useState("");
  const [tags, setTags] = useState<(TagToCreate & { id?: string })[]>([]);
  const dispatch = useAppDispatch();
  const [tagsFetched, setTagsFetched] = useState(false);

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

  useEffect(() => {
    if (tagsRepository.list.data && !tagsFetched) {
      setTags(tagsRepository.list.data);
      setTagsFetched(true);
    }
  }, [tagsRepository.list.data, tagsFetched]);

  const onLangChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value as AppLanguage);
    await i18n.changeLanguage(event.target.value);
  };

  const onCreateTag = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;
    if (tags.some((tag) => tag.label === tagLabel)) {
      dispatch(showError(t("tagExists")));
    } else {
      setTags((prevState) => [...prevState, { label: tagLabel }]);
    }
    setTagLabel("");
  };

  const onSave = () => {
    settingsRepository.update.mutate({
      userLanguage: language,
      separator,
      defaultBaseLang: baseLang,
      defaultTargetLang: targetLang,
    });
    if (tagsRepository.list.data) {
      const deleted = tagsRepository.list.data.filter((tag) => !tags.some((t) => t.label === tag.label));
      const tagLabelsFromRepository = tagsRepository.list.data.map((tag) => tag.label);
      const added = tags.filter((tag) => !tagLabelsFromRepository.includes(tag.label));
      const modified = tags.filter((tag) => {
        const tagFromRepository = tagsRepository.list.data!.find((t) => t.label === tag.label);
        return tagFromRepository && tagFromRepository.color !== tag.color;
      });
      deleted.forEach((tag) => tagsRepository.delete.mutate(tag.id));
      added.forEach((tag) => tagsRepository.create.mutate({ label: tag.label, color: tag.color }));
      modified.forEach((tag) => tag.id && tagsRepository.update.mutate({ id: tag.id, tag: { color: tag.color } }));
    }
  };

  const onDeleteTag = (tag: TagToCreate) => {
    setTags((prevState) => prevState.filter((t) => t.label !== tag.label));
  };

  const onColorChange = (tag: TagToCreate, color: string) => {
    const newTags = tags.map((t) => (t.label === tag.label ? { ...t, color } : t));
    setTags(newTags);
  };

  return {
    t,
    settings,
    settingsRepository,
    tagsRepository,
    onCreateTag,
    onDeleteTag,
    onColorChange,
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
    tagLabel,
    setTagLabel,
    tags,
    setTags,
  };
};
