import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export const LoginStyled = styled("main")({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const Form = styled("form")(({ theme }) => ({
  textAlign: "center",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  marginInline: "auto",
}));

export const LoginAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  alignSelf: "center",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  variant: "contained",
  width: "50%",
  alignSelf: "center",
  marginTop: theme.spacing(1),
}));
