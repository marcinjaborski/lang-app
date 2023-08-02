import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NoteCardStyled = styled(Card)({
  width: 150,
  height: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 30px",
  padding: theme.spacing(1),
}));

export const NoteProgress = styled(LinearProgress)({
  gridColumn: "1 / -1",
});

export const Excerpt = styled(Typography)(({ theme }) => ({
  gridColumn: "1 / -1",
  fontSize: "0.8em",
  paddingTop: theme.spacing(1),
  overflowX: "hidden",
  overflowY: "auto",
  textOverflow: "ellipsis",
  maxHeight: 104,
  "::-webkit-scrollbar": {
    width: 0,
  },
}));
