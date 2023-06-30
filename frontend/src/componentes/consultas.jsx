import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Consultas() {
  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <NavLink to="listado-cursos" className="nav-link">
            Lista de cursos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="alumnosXcurso" className="nav-link">
            Alumnos inscriptos en un curso específico
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="cursos-profesor" className="nav-link">
            Cursos de un profesor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="cursos-alumnos" className="nav-link">
            Cursos de un alumno
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="asistencia" className="nav-link">
            Asistencia de un alumno a un curso en una fecha
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default Consultas;
