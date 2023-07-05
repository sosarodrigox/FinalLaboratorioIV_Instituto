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
  const [asistencias, setAsistencias] = useState([])

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


  const getAlumnosPorCurso = async () => {
    try {
      /* setAlumnos([]); */
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


  const getAsistenciasAlumnoPorCurso = async () => {
    try {
        if(cursoSeleccionado.id && alumnoSeleccionado.id && cursoSeleccionado.fecha_inicio){
            const resultado = await axios.get(`http://localhost:8000/inscripciones/${alumnoSeleccionado.id}/${cursoSeleccionado.id}`)
            console.log(resultado.data)
            setAsistencias(resultado.data);
        }
        else {
            alert("El curso o el alumno o la fecha seleccionado son incorrectas")
        }
        
    } catch (error) {
        console.error(error);
        alert(error.response.data.detail);
    }
  }

  const handleChangeCurso = (e) => {
    /* Guardar el dato de id curso */
    setCursoSeleccionado({
      ...cursoSeleccionado,
      id: parseInt(e.target.value), // Convertir a entero
    });
    getAlumnosPorCurso();
  };

  const handleChangeAlumno = (e) => {
    /* Guardar el dato de id curso */
    setAlumnoSeleccionado({
      ...alumnoSeleccionado,
      id: parseInt(e.target.value), // Convertir a entero
    });
  };



  const handleDateChange = (date, name) => {
    /* Guardar el dato de la fecha */
    setCursoSeleccionado({
      ...cursoSeleccionado,
      [name]: date.toISOString().split("T")[0],
    });
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
          value={cursoSeleccionado.id}
          onChange={handleChangeCurso}
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
        <label htmlFor="edAlumnoEnUnCurso" className="form-label">
          Alumnos inscriptos en {cursoSeleccionado.nombre}
        </label>
        <select
          className="form-control"
          id="edAlumnoEnUnCurso"
          name="nombre"
          value={alumnoSeleccionado.id}
          onChange={handleChangeAlumno}
        >
          <option value="" disabled>
            Seleccionar curso
          </option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFechaInicio" className="form-label">
          Fecha
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

      <button type="button" className="btn btn-primary" onClick={getAsistenciasAlumnoPorCurso}>
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
{/*             <tbody>
              {asistencias.map((asistencia, idx) => (
                <tr key={asistencia.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.dni}</td>
                </tr>
              ))}
            </tbody> */}
          </table>

        </div>
      }
    </div>
  );
}

export default ListadoAsistencia;
