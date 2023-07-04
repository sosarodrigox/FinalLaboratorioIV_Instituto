import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AlumnosEnUnCurso() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("")
  const navegar = useNavigate();

  useEffect(() => {
    getDatos();
    console.log(cursos);
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get("http://localhost:8000/cursos");
    console.log(resultado);
    setCursos(resultado.data);
  };

  const handleSeleccionarCurso = (e) => {
    const cursoId = e.target.value;
    console.log(e.target.value)
    setCursoSeleccionado(cursoId);
    navegar("" + cursoId);
  };


  return (
    <>
      <div className="mb-3 col-2">
        <label htmlFor="edCursos" className="form-label">
          Cursos
        </label>
        <select
          className="form-control"
          id="edCursos"
          name="cursos"
          value={cursoSeleccionado}
          onChange={handleSeleccionarCurso}
        >
          <option value="" disabled>
            Seleccionar un curso
          </option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
        
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default AlumnosEnUnCurso;
