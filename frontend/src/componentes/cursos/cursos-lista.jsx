import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cursos as data } from "../../cursos.js";
import axios from 'axios'

function CursosLista() {
  const [cursos, setCursos] = useState([]);

  
/*     useEffect(()=>{
        setCursos(data)
    },[]) */

  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get("http://localhost:8000/cursos");
    console.log(resultado);
    setCursos(resultado.data);
  };

  return (
    <>
      <div className="Container-fluid">
        <h1 className="mt-3 tect-center">Cursos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad de alumnos</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
            </tr>
          </thead>
          <tbody>
            {
              cursos.map((curso, idx) => (
                <tr key={curso.id}>
                  <td>
                    <Link to={"" + curso.id}>{curso.id}</Link>
                  </td>
                  <td>{curso.nombre}</td>
                  <td>{curso.cantAlumnos}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button className="btn btn-primary">Agregar curso</button>
      </div>
    </>
  );
}

export default CursosLista;
