import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./util/theme";
import { ReactQueryDevtools } from "react-query/devtools";
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
