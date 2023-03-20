import styled from "styled-components";
import { Card } from "@mui/material";

export const NoteCardStyled = styled(Card)`
  width: 150px;
  height: 200px;
  border-radius: 15px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .MuiCardContent-root {
    display: grid;
    grid-template-columns: 1fr 30px;
    padding: 0.6em;
  }

  .MuiCardContent-root > * {
    grid-column: span 2;
  }

  .MuiCardContent-root > .title,
  .MuiCardContent-root > button {
    grid-column: span 1;
  }

  .excerpt {
    font-size: 0.8em;
    padding-top: 0.5em;
  }
`;
