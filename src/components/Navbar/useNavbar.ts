import { pb } from "@src/util";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavbar = () => {
  const { t } = useTranslation("navbar");
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const openedUserMenu = !!userMenuAnchorEl;
  const isLogged = pb.authStore.isValid;
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);

  const onLogin = () => {
    navigate("/login");
    onUserMenuClose();
  };

  const onLogout = () => {
    pb.authStore.clear();
    onUserMenuClose();
    navigate("/");
    navigate(0);
  };

  const onUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const onUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return {
    t,
    navigate,
    pathname: location.pathname,
    isLogged,
    noteDialogOpen,
    setNoteDialogOpen,
    onLogin,
    onLogout,
    onUserMenuOpen,
    onUserMenuClose,
    userMenuAnchorEl,
    openedUserMenu,
  };
};
