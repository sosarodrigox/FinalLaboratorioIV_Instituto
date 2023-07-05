from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.cursos_api import CursoApi, CursoSinId, CursoList, CursoProfesor
from repos.cursos_repo import CursosRepositorio
from repos.profesores_repo import ProfesoresRepositorio

# Router:
cursos_api = APIRouter(prefix='/cursos', tags=['Cursos'])

# Repos:
cursos_repo = CursosRepositorio()
profesor_repo = ProfesoresRepositorio()

# Endpoint para traer lista de CursosSinId:


@cursos_api.get('', response_model=list[CursoList])
# Inyección de dependencias: La variable db existe en el ambito de este método y luego de cierra.
def get_all(db=Depends(get_db)):
    return cursos_repo.get_all(db)

# Enpoint para traer por Id:


@cursos_api.get('/{id}', response_model=CursoApi)
def get_by_id(id: int, db=Depends(get_db)):
    result = cursos_repo.get_by_id(id, db)
    # Si el result es None levanta una excepción con código de error.
    if result is None:
        raise HTTPException(status_code=404, detail='Curso no encontrado')
    return result

# Enpoint para traer por cursos de un profesor:
# TODO: VER RESPONSE MODEL @cursos_api.get('/profesor/{id_profesor}', response_model=CursoApi)


@cursos_api.get('/profesor/{id_profesor}')
def get_cursos_profesor(id_profesor: int, db=Depends(get_db)):
    if profesor_repo.get_by_id(id_profesor, db) is None:
        raise HTTPException(status_code=404, detail='El profesor no existe')
    else:
        result = cursos_repo.get_cursos_profesor(id_profesor, db)
        if not result:
            raise HTTPException(
                status_code=404, detail='El profesor no tiene cursos asignados')
    return result

# Endpoint para Crear Cursos. Viene sin Id y lo genera la BD, devuelve con Id:


@cursos_api.post('', response_model=CursoApi, status_code=201)
def post(datos: CursoSinId, db=Depends(get_db)):
    # Verifica que hay profesor titular y no se el mismo que el auxiliar
    if datos.profesor_titular_id == None:
        raise HTTPException(
            status_code=400, detail='El profesor titular no puede estar vacío')
    else:
        # Verifica que los profesores no sean el mismo
        if datos.profesor_titular_id == datos.profesor_auxiliar_id:
            raise HTTPException(
                status_code=400, detail='Los profesores titular y auxiliar no pueden ser los mismos')

    # Verifica que la fecha de inicio no sea la misma que la fecha de fin
    if datos.fecha_inicio == datos.fecha_fin:
        raise HTTPException(
            status_code=400, detail='La fecha de inicio no puede ser igual a la fecha de fin')
     # Verifica que la fecha de fin no sea anterior a la fecha de inicio
    if datos.fecha_fin < datos.fecha_inicio:
        raise HTTPException(
            status_code=400, detail='La fecha de fin no puede ser anterior a la fecha de inicio')

     # Si no se ha seleccionado un profesor auxiliar, establecerlo como None
    if datos.profesor_auxiliar_id == "":
        datos.profesor_auxiliar_id = None

    # Si valida, crea:
    result = cursos_repo.create(db, datos)
    return result

# Endpoint para Modificar Cursos. Viene sin Id y modifica la entidad, no su Id:


@cursos_api.put('/{id}', response_model=CursoApi)
def put(id: int, datos: CursoSinId, db=Depends(get_db)):

    # Verifica que hay profesor titular y no se el mismo que el auxiliar
    if datos.profesor_titular_id == "":
        raise HTTPException(
            status_code=400, detail='El profesor titular no puede estar vacío')
    else:
        # Verifica que los profesores no sean el mismo
        if datos.profesor_titular_id == datos.profesor_auxiliar_id:
            raise HTTPException(
                status_code=400, detail='Los profesores titular y auxiliar no pueden ser los mismos')

    # Verifica que la fecha de inicio no sea la misma que la fecha de fin
    if datos.fecha_inicio == datos.fecha_fin:
        raise HTTPException(
            status_code=400, detail='La fecha de inicio no puede ser igual a la fecha de fin')
     # Verifica que la fecha de fin no sea anterior a la fecha de inicio
    if datos.fecha_fin < datos.fecha_inicio:
        raise HTTPException(
            status_code=400, detail='La fecha de fin no puede ser anterior a la fecha de inicio')
    result = cursos_repo.modify(id, datos, db)

    # Si no se ha seleccionado un profesor auxiliar, establecerlo como None
    if datos.profesor_auxiliar_id == "":
        datos.profesor_auxiliar_id = None

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
