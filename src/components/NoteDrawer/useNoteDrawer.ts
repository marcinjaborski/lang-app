import { useNotePage } from "@src/pages";
import {
  changeBaseLang,
  changeExcerpt,
  changeModule,
  changeTargetLang,
  closeDrawer,
  NoteDrawerState,
  openDrawer,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
import { Language, Module, pb } from "@src/util";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export const useNoteDrawer = () => {
  const { t } = useTranslation("noteDrawer");
  const noteDrawer: NoteDrawerState = useAppSelector((state) => state.noteDrawer);
  const dispatch = useAppDispatch();
  const { data: modules } = useQuery("list-modules", () => {
    return pb.collection("modules").getFullList() as Promise<Module[]>;
  });
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

  return {
    t,
    onOpen,
    onClose,
    onBaseLangChange,
    onTargetLangChange,
    onModuleChange,
    onExcerptChange,
    onSave,
    modules,
    ...noteDrawer,
  };
};
