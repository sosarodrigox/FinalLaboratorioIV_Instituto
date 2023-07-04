import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AlumnoInscripcion() {
    const [alumno, setAlumno] = useState({});
    const [cursos, setCursos] = useState([]);
    const [inscripcion, setInscripcion] = useState({});
    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getAlumno(params.id);
        getCursos();
    }, [params.id]);

    const getAlumno = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/alumnos/${id}`);
            setAlumno(resultado.data);
        } catch (error) {
            console.log(error);
            setAlumno({});
        }
    };

    const getCursos = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/cursos`);
            setCursos(resultado.data);
        } catch (error) {
            console.log(error);
            setCursos([]);
        }
    };

    const handleChange = (e) => {
        setInscripcion({ ...inscripcion, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        if (!inscripcion.id_curso) {
            alert("Debe seleccionar un curso");
            return;
        }

        try {
            const fecha_actual = new Date().toISOString().split("T")[0];

            const datos = {
                id_alumno: alumno.id,
                id_curso: inscripcion.id_curso,
                fecha: fecha_actual,
            };

            let resultado = await axios.post(
                `http://localhost:8000/inscripciones`,
                datos
            );

            console.log(resultado);
            alert("Inscripción cargada con éxito");
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Inscripción para Alumno:</h1>
            <h2 className="mt-3 text-center">
                {alumno.apellido}, {alumno.nombre} - {alumno.dni}
            </h2>
            <div className="mb-3 col-2-center">
                <select
                    className="form-control"
                    id="edProfeTitular"
                    name="id_curso"
                    value={inscripcion.id_curso}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                            {curso.nombre}: {curso.fecha_inicio} / {curso.fecha_fin}
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

export default AlumnoInscripcion;
