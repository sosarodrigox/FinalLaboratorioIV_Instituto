import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./componentes/home.jsx";
import Datos from "./componentes/datos.jsx";
import Consultas from "./componentes/consultas.jsx";
import CursosLista from "./componentes/cursos/cursos-lista.jsx";
import CursoForm from "./componentes/cursos/curso-form.jsx";
import ProfesoresLista from "./componentes/profesores/profesores-lista.jsx";
import ProfesorForm from "./componentes/profesores/profesor-form.jsx";
import AlumnosLista from "./componentes/alumnos/alumnos-lista.jsx";
import AlumnoForm from "./componentes/alumnos/alumno-form.jsx";
import AlumnoInscripcion from "./componentes/alumnos/alumno-inscripcion.jsx";
import ListadoAlumnosEnUnCurso from "./componentes/consultas/listado-alumnos-curso.jsx";
import PlanillaAsistencia from './componentes/consultas/planilla-asistencias.jsx'
import ListadoCursosProfesor from "./componentes/consultas/listado-cursos-profesor.jsx";
import ListadoCursosAlumno from "./componentes/consultas/listado-cursos-alumno.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="datos" element={<Datos />}>
            <Route path="cursos" element={<CursosLista />}></Route>
            <Route path="cursos/:id" element={<CursoForm />}></Route>
            <Route path="profesores" element={<ProfesoresLista />}></Route>
            <Route path="profesores/:id" element={<ProfesorForm />}></Route>
            <Route path="alumnos" element={<AlumnosLista />}></Route>
            <Route path="alumnos/:id" element={<AlumnoForm />}></Route>
            <Route
              path="alumnos/inscripcion/:id"
              element={<AlumnoInscripcion />}
            ></Route>
          </Route>
          <Route path="consultas" element={<Consultas />}>
            <Route path="alumnos-curso" element={<ListadoAlumnosEnUnCurso />}></Route>
            <Route path="cursos-profesor" element={<ListadoCursosProfesor />}></Route>
            <Route path="cursos-alumnos" element={<ListadoCursosAlumno />}></Route>
            <Route path="asistencia" element={<PlanillaAsistencia />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
