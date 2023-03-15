import { createGlobalStyle } from "styled-components";

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
  }
   
  body {
    margin: 0;
    padding: 0;
    background: #F0EBE3;
  }
  
  #root {
    display: flex;
  }
  
  #root > main {
    width: 100%;
  }
`;
