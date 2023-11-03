import { createTheme, ThemeOptions } from "@mui/material";

const borderRadius = 16;

const themeSharedOptions: ThemeOptions = {
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
          [theme.breakpoints.down("sm")]: {
            bottom: theme.spacing(12),
          },
        }),
      },
    },
  },
};

const GREEN = createTheme({
  palette: {
    primary: {
      main: "#1abc9c",
    },
    secondary: {
      main: "#facf5a",
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
  ...themeSharedOptions,
});

const ORANGE = createTheme({
  palette: {
    primary: {
      main: "#ED7D31",
    },
    secondary: {
      main: "#6C5F5B",
    },
    background: {
      default: "#4F4A45",
      paper: "#6C5F5B",
    },
    white: {
      main: "#EEEEEE",
    },
    text: {
      primary: "#e9e9ef",
      secondary: "#c7c7cb",
    },
  },
  ...themeSharedOptions,
});

const BEIGE = createTheme({
  palette: {
    primary: {
      main: "#60514b",
    },
    secondary: {
      main: "#1A120B",
    },
    background: {
      default: "#D5CEA3",
      paper: "#E5E5CB",
    },
    white: {
      main: "#EEEEEE",
    },
    text: {
      primary: "#2b2c34",
      secondary: "#2b2c34",
    },
  },
  ...themeSharedOptions,
});

export const themes = { GREEN, ORANGE, BEIGE };

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
