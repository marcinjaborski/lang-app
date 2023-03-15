import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import pb from "../util/pocketbase";

export const useNavbar = () => {
  const { t } = useTranslation("translation", { keyPrefix: "navbar" });
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const openedUserMenu = !!userMenuAnchorEl;
  const isLogged = pb.authStore.isValid;

  const onLogin = () => {
    navigate("/login");
    onUserMenuClose();
  };

  const onLogout = () => {
    pb.authStore.clear();
    navigate("/");
    onUserMenuClose();
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
    onLogin,
    onLogout,
    onUserMenuOpen,
    onUserMenuClose,
    userMenuAnchorEl,
    openedUserMenu,
  };
};
