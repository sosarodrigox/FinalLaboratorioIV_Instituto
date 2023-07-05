import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ListadoAsistencia() {
  const [cursos, setCursos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState({});
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState({});
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [asistencias, setAsistencias] = useState([]);

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

  const getAlumnosPorCurso = async (curso) => {
    try {
      /* setAlumnos([]); */
      if (curso.id) {
        const resultado = await axios.get(
          `http://localhost:8000/inscripciones/alumnos/${curso.id}`
        );
        console.log(resultado.data);
        setAlumnos(resultado.data);
        setAlumnoSeleccionado({}); // Limpiar el alumno seleccionado
      } else {
        alert("Debes seleccionar un curso");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
      setAlumnos([]); // Limpiar la lista de alumnos
      setAlumnoSeleccionado({}); // Limpiar el alumno seleccionado
      setFechaSeleccionada(null); // Limpiar el alumno seleccionado
    }
  };

  const getAsistenciasAlumnoPorCurso = async () => {
    try {
      if (cursoSeleccionado.id && alumnoSeleccionado.id && fechaSeleccionada) {
        const fechaISO = fechaSeleccionada.toISOString().split("T")[0];
        const url = `http://localhost:8000/asistencias/${alumnoSeleccionado.id}/${cursoSeleccionado.id}/${fechaISO}`;
        const resultado = await axios.get(url);
        console.log(resultado.data);
        setAsistencias(resultado.data);
      } else {
        alert("Debes seleccionar un curso, un alumno y una fecha");
        setAsistencias([]); // Limpiar la lista de asistencias
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
      setAsistencias([]); // Limpiar la lista de asistencias
    }
  };

  const handleChangeCurso = (e) => {
    const selectedCurso = cursos.find(
      (curso) => curso.id === parseInt(e.target.value)
    );
    setCursoSeleccionado(selectedCurso || {});
    getAlumnosPorCurso(selectedCurso || {});
    console.log(selectedCurso);
  };

  const handleChangeAlumno = (e) => {
    /* Guardar el dato de id curso */
    setAlumnoSeleccionado({
      ...alumnoSeleccionado,
      id: parseInt(e.target.value), // Convertir a entero
    });
  };

  const handleFechaChange = (date) => {
    /* const formattedDate = date.toISOString().split("T")[0]; */
    setFechaSeleccionada(date);
  };

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3">Datos del curso</h2>

      <div className="mb-3 col-4">
        <label htmlFor="edCursos" className="form-label">
          Cursos disponibles
        </label>
        <select
          className="form-control"
          id="edCursos"
          name="nombre"
          value={cursoSeleccionado.id}
          onChange={handleChangeCurso}
        >
          <option value="">Seleccionar un curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="edAlumnoEnUnCurso" className="form-label">
          Alumnos inscriptos en {cursoSeleccionado.nombre}
        </label>
        <select
          className="form-control"
          id="edAlumnoEnUnCurso"
          name="nombre"
          value={alumnoSeleccionado.nombre}
          onChange={handleChangeAlumno}
        >
          <option value="" disabled>
            Seleccionar alumno
          </option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFecha" className="form-label">
          Fecha
        </label>
      <DatePicker
        selected={fechaSeleccionada}
        onChange={handleFechaChange}
        dateFormat="yyyy-MM-dd" // Cambiar "YYYY" a "yyyy"
      />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={getAsistenciasAlumnoPorCurso}
      >
        Consultar
      </button>

      {/* -------------------------------------------------------------- */}

      {
        <div className="container-fluid">
          <h1 className="mt-3">Asistencia de {alumnoSeleccionado.nombre}</h1>
          <table className="table">
            <thead>
              <tr>
                {/*               <th>Id</th> */}
                <th>Alumno</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((asistencia, idx) => (
                <tr key={asistencia.id}>
                  <td>{asistencia.id_alumno}</td>
                  <td>{asistencia.id_cuso}</td>
                  <td>{asistencia.fecha}</td>
                  <td>{asistencia.asistio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default ListadoAsistencia;
