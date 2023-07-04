from fastapi import APIRouter, Depends, HTTPException
from models.inscripciones_api import InscripcionApi, InscripcionSinId
from models.cursos_api import CursoList
from models.alumnos_api import AlumnoSinId
from repos.inscripciones_repo import InscripcionesRepositorio
from repos.cursos_repo import CursosRepositorio
from repos.alumnos_repo import AlumnosRepositorio
from database import get_db

inscripciones_api = APIRouter(prefix='/inscripciones', tags=['Inscripciones'])

inscripciones_repo = InscripcionesRepositorio()
cursos_repo = CursosRepositorio()
alumnos_repo = AlumnosRepositorio()

# Alumnos inscriptos en un curso particular:


@inscripciones_api.get('/alumnos/{id_curso}', response_model=list[AlumnoSinId])
def get_alumnos_curso(id_curso: int, db=Depends(get_db)):
    # Primero verifico que el curso exista:
    if cursos_repo.get_by_id(id_curso, db) is None:
        raise HTTPException(status_code=404, detail='El curso no existe')
    else:
        result = inscripciones_repo.get_alumnos_curso(id_curso, db)
        if result is None:
            raise HTTPException(
                status_code=404, detail='No hay alumnos inscriptos en este curso')
        return result

# Enpoint para traer los cursos en que se inscribió un alumno:


@inscripciones_api.get('/cursos/{id_alumno}', response_model=list[CursoList])
def get_cursos_alumno(id_alumno: int, db=Depends(get_db)):
    if alumnos_repo.get_by_id(id_alumno, db) is None:
        raise HTTPException(status_code=404, detail='El alumno no existe')
    else:
        result = inscripciones_repo.get_cursos_alumno(id_alumno, db)
        if result is None:
            raise HTTPException(
                status_code=404, detail='El alumno no se ha inscripto a ningún curso')
    return result


@inscripciones_api.get('', response_model=list[InscripcionSinId])
def get_all(db=Depends(get_db)):
    return inscripciones_repo.get_all(db)

# Trae una inscripción de la forma: .../inscripciones/alu/cur Por ejemplo: http://127.0.0.1:8000/inscripciones/5/2


@inscripciones_api.get('/{id_alumno}/{id_curso}', response_model=InscripcionApi)
def get_by_id(id_alumno: int, id_curso: int, db=Depends(get_db)):
    result = inscripciones_repo.get_by_id(id_alumno, id_curso, db)
    # Si el result es None levanta una excepción con código de error.
    if result is None:
        raise HTTPException(
            status_code=404, detail='Inscripción no encontrada')
    return result


@inscripciones_api.post('', response_model=InscripcionApi, status_code=201)
def post(datos: InscripcionSinId, db=Depends(get_db)):
    # Primero verifico que el alumno no esté inscripto ya en el curso:
    inscripto = inscripciones_repo.get_by_id(
        datos.id_alumno, datos.id_curso, db)
    # Si el result es None permite continuar.
    if inscripto is None:
        result = inscripciones_repo.create(db, datos)
        if result == "CURSO_COMPLETO":
            raise HTTPException(status_code=400, detail='Curso completo')
        elif result == "CURSO_CERRADO":
            raise HTTPException(
                status_code=400, detail='El curso no está abierto actualmente')
        return result
    else:
        raise HTTPException(
            status_code=404, detail='El alumno ya se encuentra inscripto a este curso')
