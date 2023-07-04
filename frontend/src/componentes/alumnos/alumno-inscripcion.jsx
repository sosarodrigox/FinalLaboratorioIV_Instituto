import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AlumnoInscripcion() {
    const [alumno, setAlumno] = useState({});
    const [cursos, setCursos] = useState([]);
    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getAlumno(params.id);
    }, [params.id]);

    const getAlumno = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/alumnos/${id}`);
            /* console.log(resultado); */
            setAlumno(resultado.data);
        } catch (error) {
            console.log(error);
            setAlumno({});
        }
    };
    const getCursos = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/cursos`);
            /* console.log(resultado); */
            setCursos(resultado.data);
        } catch (error) {
            console.log(error);
            setCursos([]);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                let resultado = await axios.post(`http://localhost:8000/alumnos/`, datos);
                console.log(resultado);
                alert("Alumno cargado con éxito");
            } else {
                let resultado = await axios.put(`http://localhost:8000/alumnos/${datos.id}`, datos);
                alert("Alumno modificado con éxito");
            }
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos de: {alumno.nombre}</h2>
            <div className="mb-3 col-2">
                <label htmlFor="edId" className="form-label">
                    Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edId"
                    name="id"
                    value={alumno.id}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label>Nombre: {alumno.nombre}</label>
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

export default AlumnoInscripcion;
