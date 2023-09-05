import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GameWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: theme.spacing(5),
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    height: "100%",
    width: `calc(100% - ${theme.spacing(10)})`,
  },
}));

export const GameBoard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  overflow: "hidden",
  position: "relative",
  flex: "1 1 0",
  [theme.breakpoints.down("sm")]: {
    width: "200vw",
  },
}));

export const Term = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey.A400}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  width: "fit-content",
  borderRadius: 10,
  boxShadow: theme.shadows[1],
  fontSize: theme.typography.h5.fontSize,
  position: "absolute",
  "&.overlap-valid, &.correct": {
    borderColor: theme.palette.primary.main,
  },
  "&.overlap-invalid, &.incorrect": {
    borderColor: theme.palette.error.main,
  },
}));
