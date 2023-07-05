from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from models.asistencias_api import AsistenciaApi
from repos.asistencias_repo import AsistenciasRepositorio
from repos.alumnos_repo import AlumnosRepositorio
from repos.cursos_repo import CursosRepositorio
from database import get_db

asistencias_api = APIRouter(prefix='/asistencias', tags=['Asistencias'])

asistencias_repo = AsistenciasRepositorio()
alumnos_repo = AlumnosRepositorio()
cursos_repo = CursosRepositorio()


@asistencias_api.get('/{id_alumno}/{id_curso}/{fecha}', response_model=AsistenciaApi)
def get_asistencia_alu_cur_fec(id_alumno: int, id_curso: int, fecha: date, db=Depends(get_db)):
    # Verificamos que el alumno exista:
    if alumnos_repo.get_by_id(id_alumno, db) is None:
        raise HTTPException(status_code=404, detail='El alumno no existe')
    # Verificamos que el curso exista:
    else:
        if cursos_repo.get_by_id(id_curso, db) is None:
            raise HTTPException(status_code=404, detail='El curso no existe')
        else:
            result = asistencias_repo.get_asistencia_alu_cur_fec(
                id_alumno, id_curso, fecha, db)
            # Si el result es None levanta una excepción con código de error.
            if result is None:
                raise HTTPException(
                    status_code=404, detail='Asistencia no encontrada')
        return result


@asistencias_api.post('', response_model=AsistenciaApi, status_code=201)
def post(datos: AsistenciaApi, db=Depends(get_db)):
    result = asistencias_repo.get_asistencia_alu_cur_fec(
        datos.id_alumno, datos.id_curso, datos.fecha, db)
    # Si el result es None levanta una excepción con código de error.
    if result != None:
        raise HTTPException(status_code=404, detail='Asistencia existente')
    else:
        result = asistencias_repo.create(db, datos)
        print(result)
        return result
