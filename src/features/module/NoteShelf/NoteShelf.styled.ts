import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NoteShelfStyled = styled("section")<{ isDraggingOver?: boolean }>(({ theme, isDraggingOver }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
  backgroundColor: isDraggingOver ? theme.palette.background.paper : undefined,
}));

export const Title = styled(Typography)(({ theme }) => ({
  width: "50%",
  borderBottom: `1px solid ${theme.palette.grey["400"]}`,
}));

export const NotesWrap = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));
