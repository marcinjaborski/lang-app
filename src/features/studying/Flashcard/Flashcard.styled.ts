import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled("div")(({}) => ({
  position: "relative",
  width: "100%",
  maxWidth: "850px",
  height: "50vh",
  cursor: "pointer",
}));

export const Side = styled(Paper)(({}) => ({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  backfaceVisibility: "hidden",
  transition: "transform 300ms ease-in",
  transform: "rotateY(180deg)",
  "&.front": {
    transform: "rotateY(0deg)",
  },
  "&.flipped": {
    transform: "rotateY(0deg)",
  },
  "&.flipped.front": {
    transform: "rotateY(180deg)",
  },
}));
