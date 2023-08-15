import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Wrap = styled("main")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const QuestionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(5),
  minWidth: 350,
}));
