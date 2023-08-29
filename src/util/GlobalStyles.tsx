import { GlobalStyles } from "@mui/material";

export const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      ":root": {
        margin: 0,
        padding: 0,
        lineHeight: 1.5,
        fontWeight: 400,
        fontSynthesis: "none",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        WebkitTextSizeAdjust: "100%",
      },
      "*": {
        boxSizing: "border-box",
      },
      body: {
        margin: 0,
        padding: 0,
        background: theme.palette.background.default,
      },
      "#root": {
        display: "flex",
        "@media (max-width: 600px)": {
          flexDirection: "column-reverse",
        },
        main: {
          flexGrow: 1,
        },
      },
    })}
  />
);
