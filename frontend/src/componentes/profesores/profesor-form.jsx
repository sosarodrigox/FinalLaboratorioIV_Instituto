import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfesorForm() {
    const [datos, setDatos] = useState({});
    const params = useParams();
    const navegar = useNavigate();

    const profesor = {
        id: -1,
        nombre: "",
        apellido: "",
        dni: ""
    }

    useEffect(() => {
        if (params.id < 0) {
            /* setDatos({ id: -1, nombre: "", cantidad_}); */
            console.log(profesor)
            setDatos(profesor);
        } else {
            getProfesor(params.id);
        }

    }, [params.id]);

    const getProfesor = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/profesores/${id}`);
            /* console.log(resultado); */
            setDatos(resultado.data);
        } catch (error) {
            console.log(error);
            setDatos(profesor);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                let resultado = await axios.post(`http://localhost:8000/profesores/`, datos);
                console.log(resultado);
            } else {
                let resultado = await axios.put(`http://localhost:8000/profesores/${datos.id}`, datos);
            }
            navegar(-1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos del profesor</h2>
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
                <label htmlFor="edApellido" className="form-label">
                    Apellido
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edApellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edDni" className="form-label">
                    DNI
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edDni"
                    name="dni"
                    value={datos.dni}
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

export default ProfesorForm;
