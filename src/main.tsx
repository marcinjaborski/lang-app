import "./i18n/i18n";

import { CssBaseline } from "@mui/material";
import { App } from "@src/App";
import { store } from "@src/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const isDevelopment = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
        {isDevelopment ? <ReactQueryDevtools position="top-right" /> : null}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
