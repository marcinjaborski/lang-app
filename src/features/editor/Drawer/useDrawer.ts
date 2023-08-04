import { useModuleRepository } from "@src/hooks";
import { useNotePage } from "@src/pages";
import {
  addToShared,
  changeBaseLang,
  changeExcerpt,
  changeModule,
  changeTargetLang,
  closeDrawer,
  NoteDrawerState,
  openDrawer,
  removeFromShared,
  showError,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
import { Language, SerializableUser, User } from "@src/types";
import { pb } from "@src/util";
import React, { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useDrawer = () => {
  const { t } = useTranslation("noteDrawer");
  const noteDrawer: NoteDrawerState = useAppSelector((state) => state.noteDrawer);
  const dispatch = useAppDispatch();
  const [share, setShare] = useState("");
  const {
    list: { data: modules },
  } = useModuleRepository();
  const { onSave: saveNote } = useNotePage();

  const onOpen = () => dispatch(openDrawer());
  const onClose = () => dispatch(closeDrawer());
  const onBaseLangChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeBaseLang(event.target.value as Language));
  };
  const onTargetLangChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeTargetLang(event.target.value as Language));
  };
  const onModuleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeModule(event.target.value));
  };
  const onExcerptChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeExcerpt(event.target.value));
  };
  const onSave = () => {
    saveNote();
    onClose();
  };

  const onShare = async (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    try {
      const user = await pb.collection("users").getFirstListItem<User>(`username="${share}"`);
      dispatch(addToShared({ id: user.id, username: user.username }));
      setShare("");
    } catch (e) {
      dispatch(showError(t("noUser")));
    }
  };

  const onUnShare = (user: SerializableUser) => {
    dispatch(removeFromShared(user));
  };

  return {
    t,
    onOpen,
    onClose,
    onBaseLangChange,
    onTargetLangChange,
    onModuleChange,
    onExcerptChange,
    onShare,
    onUnShare,
    onSave,
    modules,
    share,
    setShare,
    ...noteDrawer,
  };
};
