import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";

export const ShareNoteDialogStyled = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const SharedChipsWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));
