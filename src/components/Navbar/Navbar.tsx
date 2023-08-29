import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
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
    isBottomNavbar,
    lastAccessedNote,
    setNoteDialogOpen,
    onLogin,
    onLogout,
    onUserMenuOpen,
    onUserMenuClose,
    openedUserMenu,
    userMenuAnchorEl,
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
    <ToolbarWrap component="nav" position="sticky">
      <ToggleButtonGroup
        color="white"
        exclusive
        orientation={isBottomNavbar ? "horizontal" : "vertical"}
        onChange={(_event, value) => value && navigate(value)}
      >
        <Tooltip title={t("home")}>
          <ToggleButton selected={pathname === "/"} value="/">
            <HomeIcon />
          </ToggleButton>
        </Tooltip>
        {isLogged ? (
          <Tooltip title={t("newNote")}>
            <ToggleButton value="" onClick={() => setNoteDialogOpen(true)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        ) : null}
        {isLogged ? (
          <Tooltip title={t("lastNote")}>
            <ToggleButton
              disabled={lastAccessedNote === null}
              selected={pathname.includes("/note")}
              value={`/note/${lastAccessedNote}`}
            >
              <CreateIcon />
            </ToggleButton>
          </Tooltip>
        ) : null}
        {isLogged ? (
          <Tooltip title={t("study")}>
            <ToggleButton selected={pathname === "/study"} value="/study">
              <SchoolIcon />
            </ToggleButton>
          </Tooltip>
        ) : null}
      </ToggleButtonGroup>
      <IconButton onClick={onUserMenuOpen}>
        <PersonIcon />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openedUserMenu}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClick={onUserMenuClose}
        onClose={onUserMenuClose}
      >
        {menuItems}
      </Menu>
      <CreateNoteDialog open={noteDialogOpen} setOpen={setNoteDialogOpen} />
    </ToolbarWrap>
  );
};
