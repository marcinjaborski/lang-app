import { useNoteRepository, useSettings, useTermRepository, useUserRepository } from "@src/hooks";
import { Note } from "@src/types";
import { DEFAULT_BASE_LANG, DEFAULT_TRANSLATION_LANG, getProgress } from "@src/util";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useNoteCard = (note: Note) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const navigate = useNavigate();
  const notes = useNoteRepository();
  const terms = useTermRepository();
  const settings = useSettings();
  const { currentUser } = useUserRepository();

  const noteTerms = terms.list.data?.filter((term) => term.note === note.id);
  const progress = getProgress(noteTerms);
  const baseLang = note.baseLang || settings?.baseLang || DEFAULT_BASE_LANG;
  const targetLang = note.targetLang || settings?.targetLang || DEFAULT_TRANSLATION_LANG;

  const openedMenu = !!anchorEl;
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);
  const onDelete = (id: string) => {
    if (!currentUser) return;
    if (note.owner === currentUser.id) {
      notes.delete.mutate(id);
      return;
    }
    notes.update.mutate({ id, record: { "shared-": currentUser.id } });
  };

  return {
    t,
    progress,
    anchorEl,
    baseLang,
    targetLang,
    shareDialogOpen,
    setShareDialogOpen,
    openedMenu,
    onMenuOpen,
    onMenuClose,
    navigate,
    onDelete,
  };
};
