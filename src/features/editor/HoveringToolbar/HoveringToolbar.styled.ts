import { styled } from "@mui/material/styles";

export const HoveringToolbarStyled = styled("div")(({ theme }) => ({
  position: "absolute",
  top: -10000,
  left: -10000,
  opacity: 0,
  background: theme.palette.text.primary,
  borderRadius: 4,
  transition: "opacity 500ms ease",
}));
