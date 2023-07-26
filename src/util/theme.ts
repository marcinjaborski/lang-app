import { createTheme } from "@mui/material";

const borderRadius = 16;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1abc9c",
    },
    secondary: {
      main: "#FDA769",
    },
    background: {
      default: "#F0EBE3",
      paper: "#dce5d3",
    },
    white: {
      main: "#EEEEEE",
    },
    text: {
      primary: "#2b2c34",
      secondary: "#2b2c34",
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({ padding: theme.spacing(1), borderRadius }),
        list: { padding: 0 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { borderRadius },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: "fixed",
          right: theme.spacing(2),
          bottom: theme.spacing(2),
        }),
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupPropsColorOverrides {
    white: true;
  }
}
