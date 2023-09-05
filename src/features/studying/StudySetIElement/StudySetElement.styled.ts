import { IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Card = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minWidth: 200,
  a: {
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
  },
}));

export const Options = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));
