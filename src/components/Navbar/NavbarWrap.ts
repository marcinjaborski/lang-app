import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";

export const NavbarWrap = styled.nav``;

export const ToolbarWrap = styled(AppBar)`
  height: 100vh;
  width: fit-content;
`;

export const VerticalToolbar = styled(Toolbar)`
  padding: 1em;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
