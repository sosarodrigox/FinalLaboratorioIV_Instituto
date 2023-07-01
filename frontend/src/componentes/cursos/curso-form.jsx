import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CursoForm() {
  const [datos, setDatos] = useState({});
  /* Me devuelve un objeto params que tiene todos los parametros de esa ruta, puede ser más de uno */
  const params = useParams();
  const navegar = useNavigate();

  useEffect(() => {
    if (params.id < 0) {
      console.log(params)
      setDatos({ id: -1, nombre: "" });
    } else {
    }
    getCurso(params.id);
  }, []);

  const getCurso = async (id) => {
    try {
      let resultado = await axios.get(
        `http://localhost:8000/cursos/${params.id}`
      );
      /* console.log(resultado); */
      setDatos(resultado.data);
    } catch (error) {
      console.log(error);
      setDatos({ id: -1 });
    }
  };

/*   const mostrarCurso = () => {
    <>
      Datos del curso: {params.id}
      <div>Nombre: {datos.nombre}</div>
    </>;
  }; */

  const handleChange = (e) => {
    console.log(e);
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const grabarCambios = async () => {
    try {
      let resultado = await axios.put(
        `http://localhost:8000/cursos/${datos.id}`,
        datos
      );
      /* console.log(resultado); */
      navegar(-1);
    } catch (error) {
      console.log(err);
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
          name="cant-alumnos"
          value={datos.cantAlumnos}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 col-2">
        <label htmlFor="edCantAlumnos" className="form-label">
          Fecha de inicio
        </label>
        <input
          type="text"
          className="form-control"
          id="cantAlumnos"
          name="cant-alumnos"
          value={datos.cantAlumnnos}
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
