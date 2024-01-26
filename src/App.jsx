import React from "react";
import { BrowserRouter } from "react-router-dom";

import MenuBar from "./nav/MenuBar";

export default function App() {
  return (
    <BrowserRouter>
      <MenuBar />
    </BrowserRouter>
  );
}
