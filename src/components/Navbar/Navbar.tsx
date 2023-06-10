import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { NavbarWrap, ToolbarWrap, VerticalToolbar } from "./NavbarWrap";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const {
    t,
    navigate,
    pathname,
    isLogged,
    onLogin,
    onLogout,
    onUserMenuOpen,
    onUserMenuClose,
    userMenuAnchorEl,
    openedUserMenu,
  } = useNavbar();

  return (
    <NavbarWrap>
      <ToolbarWrap position="static">
        <VerticalToolbar>
          <ToggleButtonGroup
            exclusive
            orientation="vertical"
            color="white"
            onChange={(_event, value) => navigate(value)}
          >
            <ToggleButton value="/" selected={pathname === "/"}>
              <HomeIcon />
            </ToggleButton>
            {isLogged ? (
              <ToggleButton value="/note" selected={pathname === "/note"}>
                <CreateIcon />
              </ToggleButton>
            ) : null}
          </ToggleButtonGroup>
          <IconButton onClick={onUserMenuOpen}>
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={openedUserMenu}
            onClose={onUserMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {isLogged ? (
              <MenuItem onClick={onLogout}>{t("logout")}</MenuItem>
            ) : (
              <MenuItem onClick={onLogin}>{t("login")}</MenuItem>
            )}
          </Menu>
        </VerticalToolbar>
      </ToolbarWrap>
    </NavbarWrap>
  );
};
