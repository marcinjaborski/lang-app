import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CreateNoteDialog } from "@src/components";
import { ToolbarWrap } from "./Navbar.styled";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const {
    t,
    navigate,
    pathname,
    isLogged,
    noteDialogOpen,
    setNoteDialogOpen,
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
    <ToolbarWrap position="sticky" component="nav">
      <ToggleButtonGroup
        exclusive
        orientation="vertical"
        color="white"
        onChange={(_event, value) => value && navigate(value)}
      >
        <ToggleButton value="/" selected={pathname === "/"}>
          <HomeIcon />
        </ToggleButton>
        {isLogged ? (
          <ToggleButton value="" selected={pathname.includes("/note")} onClick={() => setNoteDialogOpen(true)}>
            <CreateIcon />
          </ToggleButton>
        ) : null}
        {isLogged ? (
          <ToggleButton value="/study" selected={pathname === "/study"}>
            <SchoolIcon />
          </ToggleButton>
        ) : null}
      </ToggleButtonGroup>
      <IconButton onClick={onUserMenuOpen}>
        <PersonIcon />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchorEl}
        open={openedUserMenu}
        onClick={onUserMenuClose}
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
      <CreateNoteDialog open={noteDialogOpen} setOpen={setNoteDialogOpen} />
    </ToolbarWrap>
  );
};
