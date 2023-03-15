import { NavbarStyled } from "../styles/Navbar.styled";
import { AppBar, IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const openedUserMenu = !!userMenuAnchorEl;

  const onLogout = () => {};

  return (
    <NavbarStyled>
      <AppBar position="fixed">
        <Toolbar>
          <ToggleButtonGroup
            exclusive
            orientation="vertical"
            color="white"
            onChange={(_event, value) => navigate(value)}
          >
            <ToggleButton value="/" selected={location.pathname === "/"}>
              <HomeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <IconButton onClick={(event) => setUserMenuAnchorEl(event.currentTarget)}>
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={openedUserMenu}
            onClose={() => setUserMenuAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={onLogout}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </NavbarStyled>
  );
};

export default Navbar;
