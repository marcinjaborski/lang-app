import styled from "styled-components";
import { Drawer } from "@mui/material";

export const NoteDrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    padding: 0.5em;
    grid-gap: 0.5em;
  }

  .MuiFormControl-fullWidth {
    grid-column: span 2;
  }

  button {
    grid-column: 2 / 3;
  }
`;
