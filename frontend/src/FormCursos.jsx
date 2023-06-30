import React from "react";
import { useState } from "react";

function FormCursos() {

    
    const [curso, setCurso] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(curso)
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Ingrese el curso"
        onChange={(e) => setCurso(e.target.value)}
      />

      <button>Guardar</button>
    </form>
  );
}

export default FormCursos;
