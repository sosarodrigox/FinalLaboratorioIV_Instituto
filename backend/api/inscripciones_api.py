from fastapi import APIRouter, Depends, HTTPException
from repos.cursos_repo import CursosRepositorio
from models.inscripciones_api import InscripcionApi, InscripcionSinId
from models.alumnos_api import AlumnoSinId
from database import get_db
from repos.inscripciones_repo import InscripcionesRepositorio

inscripciones_api = APIRouter(prefix='/inscripciones', tags=['Inscripciones'])

inscripciones_repo = InscripcionesRepositorio()
cursos_repo = CursosRepositorio()

# Alumnos inscriptos en un curso particular:


@inscripciones_api.get('/{id_curso}', response_model=list[AlumnoSinId])
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
    result = inscripciones_repo.create(db, datos)
    print(result)
    return result
