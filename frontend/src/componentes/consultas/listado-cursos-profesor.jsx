import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function ListadoCursosProfesor() {
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    const [profesorSeleccionado, setProfesorSeleccionado] = useState({});

    useEffect(() => {
        getProfesores();
    }, []);

    const getProfesores = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/profesores`);
            setProfesores(resultado.data);
            console.log(resultado.data);
        } catch (error) {
            setProfesores([]);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        /* Guardar el dato de id curso */
        setProfesorSeleccionado({
            ...profesorSeleccionado,
            id: parseInt(e.target.value), // Convertir a entero
        });
    };

    const getCursosProfesor = async () => {
        try {
            setCursos([]);
            if (profesorSeleccionado.id) {
                const resultado = await axios.get(
                    `http://localhost:8000/cursos/profesor/${profesorSeleccionado.id}`
                );
                setCursos(resultado.data);
            } else {
                alert("Debes seleccionar un profesor");
            }
        } catch (error) {
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return formattedDate;
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3">Cursos asignados a un profesor</h1>

            <div className="mb-3 col-3">
                <label htmlFor="edCursos" className="form-label">
                    Profesor:
                </label>
                <select
                    className="form-control"
                    id="edCursos"
                    name="nombre"
                    value={profesorSeleccionado.nombre}
                    onChange={handleChange}
                >
                    <option value="">
                        Seleccionar profesor
                    </option>
                    {profesores.map((profesor) => (
                        <option key={profesor.id} value={profesor.id}>
                            {profesor.apellido}, {profesor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={getCursosProfesor}>
                Mostrar cursos
            </button>

            {
                <div className="container-fluid">
                    <h3 className="mt-3"> Cursos asignados </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                {/*               <th>Id</th> */}
                                <th>Nombre</th>
                                <th>Cantidad de Alumnos</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha de Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso, idx) => (
                                <tr key={curso.id}>
                                    <td>{curso.nombre}</td>
                                    <td>{curso.cantidad_alumnos}</td>
                                    <td>{formatDate(curso.fecha_inicio)}</td>
                                    <td>{formatDate(curso.fecha_fin)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            }
        </div>
    );
}

export default ListadoCursosProfesor;
