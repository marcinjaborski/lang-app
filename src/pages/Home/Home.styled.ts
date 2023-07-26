import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ModuleSkeleton = styled(Skeleton)({
  width: "50%",
  height: "3em",
});

export const NoteSkeleton = styled(Skeleton)({
  width: 150,
  height: 200,
  transform: "scale(1)",
});

export const NoteSkeletonWrap = styled("div")({
  display: "flex",
  gap: "1em",
});

export const EmptyMessage = styled("article")({
  flexGrow: 1,
  display: "grid",
  alignContent: "center",
  justifyItems: "center",
});

export const HomeStyled = styled("main")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));
