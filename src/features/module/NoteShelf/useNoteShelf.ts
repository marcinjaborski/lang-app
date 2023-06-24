import { useModuleRepository } from "@src/hooks";
import { Module } from "@src/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const useNoteShelf = () => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openedMenu = !!anchorEl;
  const modules = useModuleRepository();

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const onDelete = (module: Module) => {
    const numberOfNotes = module.expand["notes(module)"]?.length;
    if (numberOfNotes && numberOfNotes > 0) {
      return;
    }
    modules.delete.mutate(module.id);
  };

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onDelete };
};
