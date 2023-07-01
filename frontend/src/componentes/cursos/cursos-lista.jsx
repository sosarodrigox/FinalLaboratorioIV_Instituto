import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { cursos as data } from "../../cursos.js";
import axios from "axios";

function CursosLista() {
  const [cursos, setCursos] = useState([]);
  const navegar = useNavigate();

  /* 
    useEffect(()=>{
        setCursos(data)
    },[]) */

  useEffect(() => {
    getDatos();
    console.log(cursos);
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get("http://localhost:8000/cursos");
    console.log(resultado);
    setCursos(resultado.data);
  };

  const agregarCurso = () => {
    navegar("-1");
  };

  const modificarCurso = (id) => {
    navegar("" + id); /* acá va el id en string */
  };

  const eliminarCurso = async (id) => {
    try {

      const confirmarEliminar = window.confirm("¿Estás seguro de querer eliminar este curso?");
      if (confirmarEliminar) {

        await axios.delete(`http://localhost:8000/cursos/${id}`);
        setCursos(cursos.filter((curso) => curso.id !== id));

      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h1 className="mt-3">Cursos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad de alumnos</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Titular</th>
              <th>Auxiliar</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso, idx) => (
              <tr key={curso.id}>
                <td>
                  <Link to={"" + curso.id}>{curso.id}</Link>
                </td>
                <td>{curso.nombre}</td>
                <td>{curso.cantidad_alumnos}</td>
                <td>{curso.fecha_inicio}</td>
                <td>{curso.fecha_fin}</td>
                <td>{curso.profesor_titular.nombre}</td>

                {curso.profesor_auxiliar ? (
                  <td>{curso.profesor_auxiliar.nombre}</td>
                ) : (
                  <td>Sin auxiliar</td>
                )}

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => modificarCurso(curso.id)}
                  >
                    Modificar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarCurso(curso.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={agregarCurso}>
          Agregar curso
        </button>
      </div>
    </>
  );
}

export default CursosLista;
