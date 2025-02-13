import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./store";
import theme from "./theme";
import Layout from "./components/Layout";
import InventoryPage from "./pages/InventoryPage";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <InventoryPage />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
