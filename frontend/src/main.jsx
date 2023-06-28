import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App.jsx";
import "./index.css";
import Home from './componentes/home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
