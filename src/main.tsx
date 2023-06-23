import { ThemeProvider } from "@mui/material";
import { App } from "@src/App";
import { store } from "@src/store";
import { GlobalStyles, theme } from "@src/util";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";

const queryClient = new QueryClient();

const isDevelopment = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
        {isDevelopment ? <ReactQueryDevtools position="top-right" /> : null}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
