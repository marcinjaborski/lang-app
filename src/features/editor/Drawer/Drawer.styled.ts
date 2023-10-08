import { Button, Drawer, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DrawerStyled = styled(Drawer)(({ theme }) => ({
  "& > .MuiDrawer-paper": {
    width: 250,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "min-content",
    padding: theme.spacing(1),
    gridGap: theme.spacing(1),
    borderRadius: 0,
  },
}));

export const SaveButton = styled(Button)({
  gridColumn: "2 / 3",
});

export const ModuleSelect = styled(TextField)({
  gridColumn: "span 2",
});

export const ExcerptTextField = styled(TextField)({
  gridColumn: "span 2",
});
