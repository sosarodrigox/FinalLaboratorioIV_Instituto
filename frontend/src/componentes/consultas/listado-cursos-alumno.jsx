import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function ListadoCursosAlumno() {
    const [cursos, setCursos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);

    const [alumnoSeleccionado, setProfesorSeleccionado] = useState({});

    useEffect(() => {
        getProfesores();
    }, []);

    const getProfesores = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/alumnos`);
            setAlumnos(resultado.data);
            console.log(resultado.data);
        } catch (error) {
            setAlumnos([]);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        /* Guardar el dato de id curso */
        setProfesorSeleccionado({
            ...alumnoSeleccionado,
            id: parseInt(e.target.value), // Convertir a entero
        });
    };

    const getCursosAlumno = async () => {
        try {
            setCursos([]);
            if (alumnoSeleccionado.id) {
                const resultado = await axios.get(
                    `http://localhost:8000/inscripciones/cursos/${alumnoSeleccionado.id}`
                );
                setCursos(resultado.data);
            } else {
                alert("Debes seleccionar un alumno");
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
            <h1 className="mt-3">Cursos de un alumno</h1>

            <div className="mb-3 col-3">
                <label htmlFor="edCursos" className="form-label">
                    Alumno:
                </label>
                <select
                    className="form-control"
                    id="edCursos"
                    name="nombre"
                    value={alumnoSeleccionado.nombre}
                    onChange={handleChange}
                >
                    <option value="">
                        Seleccionar alumno
                    </option>
                    {alumnos.map((alumno) => (
                        <option key={alumno.id} value={alumno.id}>
                            {alumno.apellido}, {alumno.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={getCursosAlumno}>
                Mostrar cursos
            </button>

            {
                <div className="container-fluid">
                    <h1 className="mt-3"> Cursos inscripto </h1>
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

export default ListadoCursosAlumno;
