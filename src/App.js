import './App.css';
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MenuBar from './nav/MenuBar';

export default function App() {
  return (
    // <div>
    <BrowserRouter> 
      <MenuBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
      </BrowserRouter> 
    // </div>
  );
}