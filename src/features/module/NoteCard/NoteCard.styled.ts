import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";

export const NoteCardStyled = styled(Card)`
  width: 150px;
  height: 200px;
  border-radius: 15px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledCardContent = styled(CardContent)`
  display: grid;
  grid-template-columns: 1fr 30px;
  padding: 0.6em;
`;

export const Title = styled(Typography).attrs({
  color: "text.primary",
  gutterBottom: true,
})``;

export const NoteProgress = styled(LinearProgress)`
  grid-column: 1 / -1;
`;

export const Excerpt = styled(Typography)`
  grid-column: 1 / -1;
  font-size: 0.8em;
  padding-top: 0.5em;
`;
