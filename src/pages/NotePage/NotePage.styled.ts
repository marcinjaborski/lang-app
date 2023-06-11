import { IconButton } from "@mui/material";
import styled from "styled-components";

export const NotePageStyled = styled.main`
  display: flex;
  justify-content: center;
`;

export const DrawerButton = styled(IconButton).attrs({
  size: "large",
  sx: {
    position: "fixed",
  },
})`
  top: 1em;
  right: 1em;
`;
