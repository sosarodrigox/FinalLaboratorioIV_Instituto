import { cursos as data } from "./cursos.js";
import { useState, useEffect } from "react";

console.log(data)

export default function Cursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    setCursos(data)
  }, []);

  if (cursos.length === 0) {
    return <h1>No hay cursos a visualizar</h1>;
  }

  return (
    <div>
      {cursos.map((curso) => 
        <div key={curso.id}>{curso.id} - {curso.nombre}</div>
      )}
    </div>
  );
}

