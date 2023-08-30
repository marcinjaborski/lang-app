import { useNoteRepository, useSettings, useTermRepository } from "@src/hooks";
import { Note } from "@src/types";
import { getProgress } from "@src/util";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useNoteCard = (note: Note) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const notes = useNoteRepository();
  const terms = useTermRepository();
  const settings = useSettings();

  const noteTerms = terms.list.data?.filter((term) => term.note === note.id);
  const progress = getProgress(noteTerms);
  const baseLang = note.baseLang || settings?.baseLang;
  const targetLang = note.targetLang || settings?.targetLang;

  const openedMenu = !!anchorEl;
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);
  const onDelete = (id: string) => notes.delete.mutate(id);

  return { t, progress, anchorEl, baseLang, targetLang, openedMenu, onMenuOpen, onMenuClose, navigate, onDelete };
};
