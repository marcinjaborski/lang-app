import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../util/store";
import {
  changeBaseLang,
  changeExcerpt,
  changeModule,
  changeTargetLang,
  closeDrawer,
  NoteDrawerState,
  openDrawer,
} from "./noteDrawerSlice";
import { Language, Module } from "../../util/types";
import React from "react";
import { useQuery } from "react-query";
import pb from "../../util/pocketbase";
import { useNotePage } from "../../pages/NotePage/useNotePage";

export const useNoteDrawer = () => {
  const { t } = useTranslation("translation", { keyPrefix: "noteDrawer" });
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
