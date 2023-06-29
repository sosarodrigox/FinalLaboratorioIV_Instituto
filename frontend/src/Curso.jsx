import { cursos as data } from "./cursos.js";
import { useState, useEffect } from "react";


export default function Curso() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    setCursos(data);
  }, []);

  if (cursos.length === 0) {
    return <h1>No hay cursos a visualizar</h1>;
  }

  return (
    <div>
      {cursos.map((curso) => {
        <div>curso</div>;
      })}
    </div>
  );
}

