import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar.tsx";
import Dashboard from "./scenes/dashboard";
import ProductGrid from "./scenes/productsGrid";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import Product from "./scenes/product/Product";
import Page404 from "./scenes/page404/Page404";


function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar  />
          <main className="content">
            <Topbar  />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/productgrid" element={<ProductGrid />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
