import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ListadoAlumnosEnUnCurso() {
  const params = useParams();
  const [datos, setDatos] = useState([]);


  useEffect(() => {
    if (params.id < 0) {
      setDatos({});
    } else {
      getAlumnosPorCurso(params.id)
    }
  }, [params.id]);
  
  const getAlumnosPorCurso = async () => {
    try {
      const resultado = await axios.get(`http://localhost:8000/inscripciones/alumnos/${params.id}`);
      setDatos(resultado.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
    }
  };


  return (
      <div className="container-fluid">
        <h1 className="mt-3">✅Alumnos por curso seleccionado </h1>
        <table className="table">
          <thead>
            <tr>
              {/*               <th>Id</th> */}
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, idx) => (
              <tr key={dato.id}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.dni}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
  );
}

export default ListadoAlumnosEnUnCurso;
