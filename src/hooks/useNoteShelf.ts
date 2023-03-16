import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const useNoteShelf = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openedMenu = !!anchorEl;

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);

  const onMenuClose = () => setAnchorEl(null);

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose };
};
