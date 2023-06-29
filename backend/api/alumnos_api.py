from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.alumnos_api import AlumnoSinId, AlumnoApi
from repos.alumnos_repo import AlumnosRepositorio

# Router:
alumnos_api = APIRouter(prefix='/alumnos', tags=['Alumnos'])

# Repos:
alumnos_repo = AlumnosRepositorio()


@alumnos_api.get('', response_model=list[AlumnoSinId])
def get_all(db=Depends(get_db)):
    return alumnos_repo.get_all(db)


@alumnos_api.get('/ {id}', response_model=AlumnoApi)
def get_by_id(id: int, db=Depends(get_db)):
    result = alumnos_repo.get_by_id(id, db)
    if result is None:
        raise HTTPException(status_code=404, detail='Alumno no encontrado')
    return result


@alumnos_api.post('', response_model=AlumnoApi, status_code=201)
def post(datos: AlumnoSinId, db=Depends(get_db)):
    return alumnos_repo.create(db, datos)


@alumnos_api.put('/{id}', response_model=AlumnoApi)
def put(id: int, datos: AlumnoSinId, db=Depends(get_db)):
    result = alumnos_repo.modify(id, datos, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Alumno no encontrado, no se puede modificar')
    return result

# Endpoint para Borrar Profesores:


@alumnos_api.delete('/{id}', status_code=204)
def delete(id: int, db=Depends(get_db)):
    result = alumnos_repo.delete(id, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Alumno no encontrado')
    return
