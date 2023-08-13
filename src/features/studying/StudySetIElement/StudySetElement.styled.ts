import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minWidth: 200,
  a: {
    alignSelf: "center",
  },
}));
