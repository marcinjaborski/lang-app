import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Wrap = styled("main")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const SetsWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const SetSkeleton = styled(Skeleton)({
  width: 200,
  height: 150,
  transform: "scale(1)",
});
