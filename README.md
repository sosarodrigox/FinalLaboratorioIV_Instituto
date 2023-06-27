# FinalLaboratorioIV_Instituto
Trabajo Práctico Final para la materia Laboratorio de Computación IV - Aplicación completa con tecnologías: Backend: FastAPI  Frontend: React  BD: PostgreSql

## ALumnos: 
    * Cuenca, Analía
    * Sosa, Rodrigo

## Consigna:

### Instituto.

Realice un sistema que permita llevar la administración de un Instituto de Enseñanza. Debe permitir la administración de Profesores y alumnos, y agrupar estos en cursos. 

Los cursos pueden tener una cantidad N de alumnos (N depende del curso) y tienen un nombre, una fecha de inicio y otra de fin. Cada curso debe tener un profesor asignado y puede tener un segundo profesor como auxiliar.Se debe permitir ingresar y consultar la planilla de asistencia de cada curso. Un profesor puede estar asignado a varios cursos. Un alumno puede estar inscripto en varios cursos, pero no dos veces en el mismo (validar). La inscripción debe tener una fecha de inicio y fin (por defecto, las mismas que el curso al que se inscribe).

Consultas:

    * Lista de cursos
    * Detalle de los alumnos inscriptos en un curso particular
    * Cursos de un profesor
    * Cursos de un alumno
    * Asistencia de un alumno a un curso en una fecha


Acorde a lo que dimos en clase, las tecnologías a usar son las siguientes:

### Backend: FastAPI

### Frontend: React

### BD: PostgreSql

===================================================================
FrontEnd: "react": "^18.2.0", (@rodrigo: nvm alias default 18.16.1)
Crear la app con vite: 
 1) npm create vite@latest frontend
 2) Select:React
 3) Select: JavaScript

Ejecutar:
 1) cd frontend
 2) npm install
 3) frontend> *npm run dev*

Paquetes a instalar:
    * ReactRouter: npm install react-router-dom
    * Bootstrap: npm install bootstrap
    * Axios: npm install axios

===================================================================
Backend: 

