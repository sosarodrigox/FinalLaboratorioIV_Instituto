import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AlumnosLista() {
    const [alumnos, setAlumnos] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        getDatos();
        console.log(alumnos);
    }, []);

    const getDatos = async () => {
        let resultado = await axios.get("http://localhost:8000/alumnos");
        console.log(resultado);
        setAlumnos(resultado.data);
    };

    const agregarAlumno = () => {
        navegar("-1");
    };

    const modificarAlumno = (id) => {
        navegar("" + id);
    };

    const eliminarAlumno = async (id) => {
        try {
            const confirmarEliminar = window.confirm(
                "¿Estás seguro de querer eliminar este alumno?"
            );
            if (confirmarEliminar) {
                await axios.delete(`http://localhost:8000/alumnos/${id}`);
                setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <h1 className="mt-3">Alumnos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno, idx) => (
                            <tr key={alumno.id}>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.apellido}</td>
                                <td>{alumno.dni}</td>

                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => modificarAlumno(alumno.id)}
                                    >
                                        Modificar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => eliminarAlumno(alumno.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={agregarAlumno}>
                    Agregar Alumno
                </button>
            </div>
        </>
    );
}

export default AlumnosLista;
