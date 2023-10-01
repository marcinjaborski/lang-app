import { useModuleRepository, useNoteRepository } from "@src/hooks";
import { openDialog, showError, useAppDispatch } from "@src/store";
import { Module } from "@src/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useNoteShelf = () => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openedMenu = !!anchorEl;
  const notes = useNoteRepository();
  const modules = useModuleRepository();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const onCreateNote = async (module: Module) => {
    const notesInModule = module.expand["notes(module)"]?.length || 0;
    notes.create.mutate(
      {
        title: `${t("newNoteName")} #${notesInModule + 1}`,
        module: module.id,
      },
      {
        onSuccess(note) {
          navigate(`/note/${note.id}`);
        },
      },
    );
  };

  const onUpdate = (moduleId: string) => dispatch(openDialog({ type: "update", moduleId }));

  const onDelete = (module: Module) => {
    const numberOfNotes = module.expand["notes(module)"]?.length;
    if (numberOfNotes && numberOfNotes > 0) {
      dispatch(showError(t("nonEmptyModule")));
      return;
    }
    modules.delete.mutate(module.id);
  };

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onCreateNote, onUpdate, onDelete };
};
