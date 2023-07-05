import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PlanillaAsistencia() {
  const [cursos, setCursos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const navegar = useNavigate();

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
      console.log(error.target.name);
      console.log(error.target.value);
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

  const getAlumnosPorCurso = async () => {
    try {
      setAlumnos([]);
      if (cursoSeleccionado.id) {
        const resultado = await axios.get(
          `http://localhost:8000/inscripciones/alumnos/${cursoSeleccionado.id}`
        );
        setAlumnos(resultado.data);
      } else {
        // Lógica para manejar el caso en que no haya un curso seleccionado
        // Puedes mostrar un mensaje de error o realizar alguna otra acción
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
    }
  };



  const handleDateChange = (date, name) => {
    /* Guardar el dato de la fecha */
    setCursoSeleccionado({
      ...cursoSeleccionado,
      [name]: date.toISOString().split("T")[0],
    });
  };

  const grabarAsistio = async (alumnoId) => {
    try {
      let datos = {
        "id_alumno": alumnoId,
        "id_curso": cursoSeleccionado.id,
        "fecha": cursoSeleccionado.fecha_inicio,
        "asistio": true
      }

      console.log(datos)

      //Lo que está trayendo:
      /*
      {id_alumno: undefined, id_curso: '4', fecha: '2023-06-26', asistio: true}
          asistio:true
          fecha:"2023-06-26"
          id_alumno:undefined
          id_curso:"4"
      */

      // // Funciona:
      // let datos = {
      //   "id_alumno": 7,
      //   "id_curso": 11,
      //   "fecha": "2023-07-08",
      //   "asistio": true
      // }


      let resultado = await axios.post(`http://localhost:8000/asistencias/`, datos);
      console.log(resultado);
      alert("Cargado que asistió");

    } catch (error) {
      alert(error.response.data.detail);
    }
  };


  const grabarNoAsistio = async (alumnoId) => {
    try {
      let datos = {
        "id_alumno": alumnoId,
        "id_curso": cursoSeleccionado.id,
        "fecha": cursoSeleccionado.fecha_inicio,
        "asistio": false
      }

      console.log(datos)

      //Lo que está trayendo:
      /*
      {id_alumno: undefined, id_curso: '4', fecha: '2023-06-26', asistio: true}
          asistio:true
          fecha:"2023-06-26"
          id_alumno:undefined
          id_curso:"4"
      */

      // // Funciona:
      // let datos = {
      //   "id_alumno": 7,
      //   "id_curso": 11,
      //   "fecha": "2023-07-08",
      //   "asistio": true
      // }


      let resultado = await axios.post(`http://localhost:8000/asistencias/`, datos);
      console.log(resultado);
      alert("Cargado que asistió");

    } catch (error) {
      alert(error.response.data.detail);
    }
  };



  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3">Datos del curso</h2>

      <div className="mb-3 col-3">
        <label htmlFor="edCursos" className="form-label">
          Cursos disponibles
        </label>
        <select
          className="form-control"
          id="edCursos"
          name="nombre"
          value={cursoSeleccionado.nombre}
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccionar curso
          </option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFechaInicio" className="form-label">
          Fecha de inicio
        </label>
        <DatePicker
          className="form-control"
          id="edFechaInicio"
          name="fecha_inicio"
          selected={
            cursoSeleccionado.fecha_inicio
              ? new Date(cursoSeleccionado.fecha_inicio)
              : null
          }
          onChange={(date) => handleDateChange(date, "fecha_inicio")}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={getAlumnosPorCurso}>
        Cargar
      </button>

      {/* -------------------------------------------------------------- */}

      {
        <div className="container-fluid">
          <h1 className="mt-3">Alumnos por curso seleccionado </h1>
          <table className="table">
            <thead>
              <tr>
                {/*               <th>Id</th> */}
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, idx) => (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.dni}</td>
                  <td>          <button
                    className="btn btn-secondary ms-1"
                    onClick={() => grabarAsistio(alumno.id)}
                  >
                    Asistio
                  </button></td>
                  <td>          <button
                    className="btn btn-secondary ms-1"
                    onClick={() => grabarNoAsistio(alumno.id)}
                  >
                    No asistió
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      }
    </div>
  );
}

export default PlanillaAsistencia;
