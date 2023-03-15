import { createTheme } from "@mui/material";

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
