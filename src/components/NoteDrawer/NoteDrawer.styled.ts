import { Button, Drawer } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const NoteDrawerStyled = styled(Drawer)`
  & > .MuiDrawer-paper {
    width: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    padding: 0.5em;
    grid-gap: 0.5em;
  }
`;

export const SaveButton = styled(Button)`
  grid-column: 2 / 3;
`;

export const ModuleSelect = styled(TextField)`
  grid-column: span 2;
`;

export const ExcerptTextField = styled(TextField)`
  grid-column: span 2;
`;
