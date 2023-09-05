import { styled } from "@mui/material/styles";
import { Editable } from "slate-react";

export const NoteEditorStyled = styled("div")(({ theme }) => ({
  width: "50%",
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const EditableStyled = styled(Editable)(({ theme }) => ({
  background: theme.palette.grey["100"],
  padding: theme.spacing(2),
  flexGrow: 1,
  border: `2px dotted ${theme.palette.primary.main}`,
}));
