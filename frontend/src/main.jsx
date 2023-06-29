import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./componentes/home";
import "bootstrap/dist/css/bootstrap.min.css";

import { Posts }  from "./Posts.jsx";
import Curso from './Curso.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    <input id="hola" onChange={(e) => console.log(e.target.value)}></input>
    <br />
    <Posts></Posts>
    <Curso></Curso>
  </React.StrictMode>
);
