import { createGlobalStyle } from "styled-components";

export const backgroundColor = "#F0EBE3";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    margin: 0;
    padding: 0;

    --background: ${backgroundColor};
  }
   
  body {
    margin: 0;
    padding: 0;
    background: var(--background);
  }
  
  #root {
    display: flex;
  }
  
  #root > main {
    flex-grow: 1;
  }
  
  .MuiBackdrop-root > .MuiCircularProgress-root {
    margin-left: 80px;
  }

  .MuiFab-root {
    position: fixed !important;
    right: 1em;
    bottom: 1em;
  }
`;
