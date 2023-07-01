import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './componentes/home.jsx';
import Datos from './componentes/datos.jsx';
import Consultas from './componentes/consultas.jsx';
import CursosLista from './componentes/cursos/cursos-lista.jsx'
import CursoForm from "./componentes/cursos/curso-form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="datos" element={<Datos />}>
            <Route path="cursos" element={<CursosLista/>}></Route>
            <Route path="cursos/:id" element={<CursoForm/>}></Route>
          </Route>
          <Route path="consultas" element={<Consultas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
