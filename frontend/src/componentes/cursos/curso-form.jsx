import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CursoForm() {
  const [datos, setDatos] = useState({});
  const [profesores, setProfesores] = useState([]);
  const params = useParams();
  const navegar = useNavigate();

  const curso = {
    id: -1,
    nombre: "",
    cantidad_alumnos: "",
    fecha_inicio: "",
    fecha_fin: "",
    profesor_titular_id: "",
    profesor_auxiliar_id: "",
  }

  useEffect(() => {
    if (params.id < 0) {
      setDatos(curso);
    } else {
      getCurso(params.id);
    }
    getProfesores(); //Traigo los profesores para el desplegable
  }, [params.id]);

  const getCurso = async (id) => {
    try {
      let resultado = await axios.get(`http://localhost:8000/cursos/${id}`);
      setDatos(resultado.data);
    } catch (error) {
      console.log(error);
      setDatos(curso);
    }
  };

  const getProfesores = async () => {
    try {
      let resultado = await axios.get("http://localhost:8000/profesores");
      setProfesores(resultado.data);
    } catch (error) {
      console.log(error);
      setProfesores([])
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setDatos({ ...datos, [name]: date.toISOString().split('T')[0] });
  };

  const grabarCambios = async () => {
    try {
      if (datos.id === -1) {
        let resultado = await axios.post(`http://localhost:8000/cursos/`, datos);
        console.log(resultado);
        alert("Curso cargado con éxito");
      } else {
        let resultado = await axios.put(`http://localhost:8000/cursos/${datos.id}`, datos);
        alert("Curso modificado con éxito");
      }
      navegar(-1);
    } catch (error) {
      alert(error.response.data.detail);
    }
  };

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos del curso</h2>
      <div className="mb-3 col-2">
        <label htmlFor="edId" className="form-label">
          Id
        </label>
        <input
          type="text"
          className="form-control"
          id="edId"
          name="id"
          value={datos.id}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="edNombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="edNombre"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edCantAlumnos" className="form-label">
          Cantidad de alumnos
        </label>
        <input
          type="text"
          className="form-control"
          id="edCantAlumnos"
          name="cantidad_alumnos"
          value={datos.cantidad_alumnos}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFechaInicio" className="form-label">
          Fecha de inicio
        </label>
        <DatePicker
          className="form-control"
          id="edFechaInicio"
          name="fecha_inicio"
          selected={datos.fecha_inicio ? new Date(datos.fecha_inicio) : null}
          onChange={(date) => handleDateChange(date, "fecha_inicio")}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFechaFin" className="form-label">
          Fecha de fin
        </label>
        <DatePicker
          className="form-control"
          id="edFechaFin"
          name="fecha_fin"
          selected={datos.fecha_fin ? new Date(datos.fecha_fin) : null}
          onChange={(date) => handleDateChange(date, "fecha_fin")}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edProfeTitular" className="form-label">
          Profesor titular
        </label>
        <select
          className="form-control"
          id="edProfeTitular"
          name="profesor_titular_id"
          value={datos.profesor_titular_id}
          onChange={handleChange}
        >
          <option value="">Seleccionar profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor.id} value={profesor.id}>
              {profesor.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edAuxiliar" className="form-label">
          Profesor auxiliar
        </label>
        <select
          className="form-control"
          id="edAuxiliar"
          name="profesor_auxiliar_id"
          value={datos.profesor_auxiliar_id}
          onChange={handleChange}
        >
          <option value="" selected>Seleccionar profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor.id} value={profesor.id}>
              {profesor.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary me-1" onClick={grabarCambios}>
          Aceptar
        </button>
        <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CursoForm;
