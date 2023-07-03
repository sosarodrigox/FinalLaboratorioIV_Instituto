import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfesoresLista() {
    const [profesores, setProfesores] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        getDatos();
        console.log(profesores);
    }, []);

    const getDatos = async () => {
        let resultado = await axios.get("http://localhost:8000/profesores");
        console.log(resultado);
        setProfesores(resultado.data);
    };

    const agregarProfesor = () => {
        navegar("-1");
    };

    const modificarProfesor = (id) => {
        navegar("" + id);
    };

    const eliminarProfesor = async (id) => {
        try {
            const confirmarEliminar = window.confirm(
                "¿Estás seguro de querer eliminar este profesor?"
            );
            if (confirmarEliminar) {
                await axios.delete(`http://localhost:8000/profesores/${id}`);
                setProfesores(profesores.filter((profesor) => profesor.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // TODO: CAMBIAR -> Ordenar la lista de cursos por ID de manera ascendente
    const profesoresOrdenados = profesores.sort((a, b) => a.id - b.id);

    return (
        <>
            <div className="container-fluid">
                <h1 className="mt-3">Profesores</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesoresOrdenados.map((profesor, idx) => (
                            <tr key={profesor.id}>
                                <td>{profesor.nombre}</td>
                                <td>{profesor.apellido}</td>
                                <td>{profesor.dni}</td>

                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => modificarProfesor(profesor.id)}
                                    >
                                        Modificar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => eliminarProfesor(profesor.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={agregarProfesor}>
                    Agregar Profesor
                </button>
            </div>
        </>
    );
}

export default ProfesoresLista;
