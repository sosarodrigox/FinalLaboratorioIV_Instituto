from fastapi import APIRouter, Depends, HTTPException
from models.cursos_api import CursoSinId
from database import get_db
from models.profesores_api import ProfesorApi, ProfesorSinId
from repos.profesores_repo import ProfesoresRepositorio

# Router:
profesores_api = APIRouter(prefix='/profesores', tags=['Profesores'])

# Repos:
profesores_repo = ProfesoresRepositorio()


# Endpoint para traer lista de ProfesoresSinId:
@profesores_api.get('', response_model=list[ProfesorSinId])
# Inyección de dependencias: La variable db existe en el ambito de este método y luego de cierra.
def get_all(db=Depends(get_db)):
    result = profesores_repo.get_all(db)
    print(result)
    return result

# Endpoint para traer cursos de un profesor


@profesores_api.get('/cursos/{id}', response_model=CursoSinId)
def get_cursos_profesor(id: int, db=Depends(get_db)):
    # Primero verifico que el profesor exista:
    if profesores_repo.get_by_id(id, db) is None:
        raise HTTPException(status_code=404, detail='El profesor no existe')
    else:
        result = profesores_repo.get_cursos_profesor(id, db)
        if result is None:
            raise HTTPException(
                status_code=404, detail='El profesro no tiene cursos asignados')
        return result


# Enpoint para traer por Id:
@profesores_api.get('/ {id}', response_model=ProfesorApi)
def get_by_id(id: int, db=Depends(get_db)):
    result = profesores_repo.get_by_id(id, db)
    # Si el result es None levanta una excepción con código de error.
    if result is None:
        raise HTTPException(status_code=404, detail='Profesor no encontrado')
    return result

# Endpoint para Crear Profesores. Viene sin Id y lo genera la BD, devuelve con Id:


@profesores_api.post('', response_model=ProfesorApi, status_code=201)
def post(datos: ProfesorSinId, db=Depends(get_db)):
    result = profesores_repo.create(db, datos)
    return result

# Endpoint para Modificar Profesores. Viene sin Id y modifica la entidad, no su Id:


@profesores_api.put('/{id}', response_model=ProfesorApi)
def put(id: int, datos: ProfesorSinId, db=Depends(get_db)):
    result = profesores_repo.modify(id, datos, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Profesor no encontrado, no se puede modificar')
    return result

# Endpoint para Borrar Profesores:


@profesores_api.delete('/{id}', status_code=204)
def delete(id: int, db=Depends(get_db)):
    result = profesores_repo.delete(id, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Profesor no encontrado')
    return
