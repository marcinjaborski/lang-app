import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NotFoundStyled = styled("main")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

export const Title = styled(Typography)({
  fontSize: "1.2em",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 3,
  paddingLeft: 6,
});

export const NumbersWrap = styled(Typography)({
  fontSize: "16em",
  fontWeight: 900,
  lineHeight: 0.8,
  textTransform: "uppercase",
  letterSpacing: -40,
});

export const Number = styled("span")(({ theme }) => ({
  textShadow: `-8px 0 0 ${theme.palette.background.default}`,
}));

export const LoginPrompt = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const LoginButton = styled(Button)({
  width: "fit-content",
});
