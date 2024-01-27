import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MenuBar from "./nav/MenuBar";
import { ThemeProvider } from "@mui/styles";
import theme from "./theme";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MenuBar />
      </ThemeProvider>
    </BrowserRouter>
  );
}
