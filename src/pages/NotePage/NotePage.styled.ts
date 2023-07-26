import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NotePageStyled = styled("main")({
  display: "flex",
  justifyContent: "center",
});

export const DrawerButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));
