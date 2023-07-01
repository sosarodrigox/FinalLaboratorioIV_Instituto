from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.cursos_api import CursoApi, CursoSinId
from repos.cursos_repo import CursosRepositorio

# Router:
cursos_api = APIRouter(prefix='/cursos', tags=['Cursos'])

# Repos:
cursos_repo = CursosRepositorio()

# Endpoint para traer lista de CursosSinId:


@cursos_api.get('', response_model=list[CursoApi])
# Inyección de dependencias: La variable db existe en el ambito de este método y luego de cierra.
def get_all(db=Depends(get_db)):
    return cursos_repo.get_all(db)

# Enpoint para traer por Id:


@cursos_api.get('/ {id}', response_model=CursoApi)
def get_by_id(id: int, db=Depends(get_db)):
    result = cursos_repo.get_by_id(id, db)
    # Si el result es None levanta una excepción con código de error.
    if result is None:
        raise HTTPException(status_code=404, detail='Curso no encontrado')
    return result

# Endpoint para Crear Cursos. Viene sin Id y lo genera la BD, devuelve con Id:


@cursos_api.post('', response_model=CursoApi, status_code=201)
def post(datos: CursoSinId, db=Depends(get_db)):
    result = cursos_repo.create(db, datos)
    return result

# Endpoint para Modificar Cursos. Viene sin Id y modifica la entidad, no su Id:


@cursos_api.put('/{id}', response_model=CursoApi)
def put(id: int, datos: CursoSinId, db=Depends(get_db)):
    result = cursos_repo.modify(id, datos, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Curso no encontrado, no se puede modificar')
    return result

# Endpoint para Borrar Cursos:


@cursos_api.delete('/{id}', status_code=204)
def delete(id: int, db=Depends(get_db)):
    result = cursos_repo.delete(id, db)
    if result is None:
        raise HTTPException(
            status_code=404, detail='Curso no encontrado')
    return
