import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NoteShelfStyled = styled("section")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export const Title = styled(Typography)(({ theme }) => ({
  width: "50%",
  borderBottom: `1px solid ${theme.palette.grey["400"]}`,
}));

export const NotesWrap = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));
