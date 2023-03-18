import { createTheme } from "@mui/material";
import { backgroundColor, primaryColor } from "../styles/GlobalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: "#FDA769",
    },
    background: {
      default: backgroundColor,
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
