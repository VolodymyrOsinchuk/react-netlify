import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "./routes/router";
import rootTheme from "./theme";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={rootTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
