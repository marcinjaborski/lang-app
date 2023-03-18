import { NavbarStyled } from "../styles/Navbar.styled";
import { AppBar, IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import { useNavbar } from "../hooks/useNavbar";

const Navbar = () => {
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
    <NavbarStyled>
      <AppBar position="static">
        <Toolbar>
          <ToggleButtonGroup
            exclusive
            orientation="vertical"
            color="white"
            onChange={(_event, value) => navigate(value)}
          >
            <ToggleButton value="/" selected={pathname === "/"}>
              <HomeIcon />
            </ToggleButton>
            <ToggleButton value="/note" selected={pathname === "/note"}>
              <CreateIcon />
            </ToggleButton>
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
        </Toolbar>
      </AppBar>
    </NavbarStyled>
  );
};

export default Navbar;
