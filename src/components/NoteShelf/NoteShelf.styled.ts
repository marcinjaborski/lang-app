import { Typography } from "@mui/material";
import styled from "styled-components";

export const NoteShelfStyled = styled.section`
  width: 100%;
  margin-top: 0.5em;
`;

export const Title = styled(Typography).attrs({ variant: "h5", gutterBottom: true })`
  width: 50%;
  border-bottom: 1px solid #d1d0ce;
`;

export const NotesWrap = styled.div`
  display: flex;
  gap: 1em;
`;
