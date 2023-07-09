import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ToolbarWrap } from "./Navbar.styled";
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

  const menuItems = isLogged
    ? [
        <MenuItem key="settings" onClick={() => navigate("/settings")}>
          {t("settings")}
        </MenuItem>,
        <MenuItem key="logout" onClick={onLogout}>
          {t("logout")}
        </MenuItem>,
      ]
    : [
        <MenuItem key="login" onClick={onLogin}>
          {t("login")}
        </MenuItem>,
      ];

  return (
    <ToolbarWrap position="static" component="nav">
      <ToggleButtonGroup exclusive orientation="vertical" color="white" onChange={(_event, value) => navigate(value)}>
        <ToggleButton value="/" selected={pathname === "/"}>
          <HomeIcon />
        </ToggleButton>
        {isLogged ? (
          <ToggleButton value="/note" selected={pathname.includes("/note")}>
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
        {menuItems}
      </Menu>
    </ToolbarWrap>
  );
};
