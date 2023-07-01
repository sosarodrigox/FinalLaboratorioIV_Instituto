import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CursoForm() {
  const [datos, setDatos] = useState({});
  /* Me devuelve un objeto params que tiene todos los parametros de esa ruta, puede ser más de uno */
  const params = useParams();
  const navegar = useNavigate();

  const curso = {
    id: -1,
    nombre: "",
    cantidad_alumnos: null,
    fecha_inicio: null,
    fecha_fin: null,
    profesor_titular_id: null,
    profesor_auxiliar_id: null,
  }

  useEffect(() => {
    if (params.id < 0) {
      /* setDatos({ id: -1, nombre: "", cantidad_}); */
      console.log(curso)
      setDatos(curso);
    } else {
      getCurso(params.id);
    }
    
  }, [params.id]);

  const getCurso = async (id) => {
    try {
      let resultado = await axios.get(`http://localhost:8000/cursos/${id}`);
      /* console.log(resultado); */
      setDatos(resultado.data);
    } catch (error) {
      console.log(error);
      setDatos(curso);
    }
  };

  /*   const mostrarCurso = () => {
    <>
      Datos del curso: {params.id}
      <div>Nombre: {datos.nombre}</div>
    </>;
  }; */

  const handleChange = (e) => {
    /* console.log(e); */
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const grabarCambios = async () => {
    try {
      if (datos.id == -1) {
        let resultado = await axios.post(`http://localhost:8000/cursos/`, datos);
        /* Aca puedo tomar el resultado que me da await y ponerlo en el estado y seguir mostrandolo en el formulario */
        console.log(resultado);
      } else {
        let resultado = await axios.put(`http://localhost:8000/cursos/${datos.id}`, datos);
        /* console.log(resultado); */
      }
      navegar(-1); /* vuelvo a la pagina del listado de cursos, hace un get a todos los cursos actualizados*/
    } catch (error) {
      console.log(error);
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
        <input
          type="text"
          className="form-control"
          id="edFechaInicio"
          name="fecha_inicio"
          value={datos.fecha_inicio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edFechaFin" className="form-label">
          Fecha de fin
        </label>
        <input
          type="text"
          className="form-control"
          id="edFechaFin"
          name="fecha_fin"
          value={datos.fecha_fin}
          onChange={handleChange}
        />
      </div>


      <div className="mb-3 col-2">
        <label htmlFor="edProfeTitular" className="form-label">
          Profesor titular
        </label>
        <input
          type="text"
          className="form-control"
          id="edProfeTitular"
          name="profesor_titular_id"
          value={datos.profesor_titular_id}
          onChange={handleChange}
        />
      </div>


      <div className="mb-3 col-2">
        <label htmlFor="edAuxiliar" className="form-label">
          Profesor auxiliar
        </label>
        <input
          type="text"
          className="form-control"
          id="edAuxiliar"
          name="profesor_auxiliar_id"
          value={datos.profesor_auxiliar_id}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary me-1" onClick={grabarCambios}>
          Aceptar
        </button>
        {/* con el navigate va a la pagina anterior en la lista de paginas que recorrió  */}
        <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
          Cancelar
        </button>
      </div>
    </div>

    /* {datos.id >=0 ? mostrarCurso() : "No hay datos"} */
  );
}

export default CursoForm;
