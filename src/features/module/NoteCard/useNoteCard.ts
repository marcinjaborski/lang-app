import { useNoteRepository } from "@src/hooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useNoteCard = () => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const notes = useNoteRepository();

  const openedMenu = !!anchorEl;
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);
  const onDelete = (id: string) => notes.delete.mutate(id);

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, navigate, onDelete };
};
