import re
from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.profesores_api import ProfesorApi, ProfesorSinId
from repos.profesores_repo import ProfesoresRepositorio

# Router:
profesores_api = APIRouter(prefix='/profesores', tags=['Profesores'])

# Repos:
profesores_repo = ProfesoresRepositorio()

# Endpoint para traer lista de ProfesoresSinId:


@profesores_api.get('', response_model=list[ProfesorApi])
# Inyección de dependencias: La variable db existe en el ambito de este método y luego de cierra.
def get_all(db=Depends(get_db)):
    result = profesores_repo.get_all(db)
    print(result)
    return result

# Enpoint para traer por Id:


@profesores_api.get('/{id}', response_model=ProfesorApi)
def get_by_id(id: int, db=Depends(get_db)):
    result = profesores_repo.get_by_id(id, db)
    # Si el result es None levanta una excepción con código de error.
    if result is None:
        raise HTTPException(status_code=404, detail='Profesor no encontrado')
    return result

# Endpoint para Crear Profesores. Viene sin Id y lo genera la BD, devuelve con Id:


@profesores_api.post('', response_model=ProfesorApi, status_code=201)
def post(datos: ProfesorSinId, db=Depends(get_db)):
    # Verifica la longitud del campo dni
    if len(datos.dni) > 8:
        raise HTTPException(
            status_code=400, detail='El "dni" no puede tener más de 8 caracteres')

    # Verifica que el campo dni solo contenga números (Utilizamos expresiones regulares libreria "re")
    if not re.match(r'^\d+$', datos.dni):
        raise HTTPException(
            status_code=400, detail='El "dni" solo puede tener caracteres numéricos sin puntos')

    result = profesores_repo.create(db, datos)
    return result

# Endpoint para Modificar Profesores. Viene sin Id y modifica la entidad, no su Id:


@profesores_api.put('/{id}', response_model=ProfesorApi)
def put(id: int, datos: ProfesorSinId, db=Depends(get_db)):
    # Verifica la longitud del campo dni
    if len(datos.dni) > 8:
        raise HTTPException(
            status_code=400, detail='El "dni" no puede tener más de 8 caracteres')

    # Verifica que el campo dni solo contenga números (Utilizamos expresiones regulares libreria "re")
    if not re.match(r'^\d+$', datos.dni):
        raise HTTPException(
            status_code=400, detail='El "dni" solo puede tener caracteres numéricos sin puntos')

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
