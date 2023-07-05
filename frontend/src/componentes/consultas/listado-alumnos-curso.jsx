import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function ListadoAlumnosEnUnCurso() {
  const [cursos, setCursos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const [cursoSeleccionado, setCursoSeleccionado] = useState({});

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = async () => {
    try {
      let resultado = await axios.get(`http://localhost:8000/cursos`);
      setCursos(resultado.data);
      console.log(resultado.data);
    } catch (error) {
      setCursos([]);
      alert(error.response.data.detail);
    }
  };

  const handleChange = (e) => {
    /* Guardar el dato de id curso */
    setCursoSeleccionado({
      ...cursoSeleccionado,
      id: parseInt(e.target.value), // Convertir a entero
    });
  };

  const getAlumnosCurso = async () => {
    try {
      setAlumnos([]);
      if (cursoSeleccionado.id) {
        const resultado = await axios.get(
          `http://localhost:8000/inscripciones/alumnos/${cursoSeleccionado.id}`
        );
        setAlumnos(resultado.data);
      } else {
        alert("Debes seleccionar un curso");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
    }
  };

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h1 className="mt-3">Alumnos inscriptos en un curso</h1>
      <div className="mb-3 col-3">
        <label htmlFor="edCursos" className="form-label">
          Curso:
        </label>
        <select
          className="form-control"
          id="edCursos"
          name="nombre"
          value={cursoSeleccionado.nombre}
          onChange={handleChange}
        >
          <option value="">
            Seleccione un curso
          </option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="btn btn-primary" onClick={getAlumnosCurso}>
        Mostrar alumnos
      </button>

      {
        <div className="container-fluid">
          <h3 className="mt-3"> Alumnos inscriptos: </h3>
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
              {alumnos.map((alumno, idx) => (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.dni}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      }
    </div>
  );
}

export default ListadoAlumnosEnUnCurso;
