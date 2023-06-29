from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.inscripciones_api import InscripcionApi, InscripcionSinId
from repos.inscripciones_repo import InscripcionesRepositorio

inscripciones_api = APIRouter(prefix='/inscripciones', tags=['Inscripciones'])

inscripciones_repo = InscripcionesRepositorio()


@inscripciones_api.get('', response_model=list[InscripcionSinId])
def get_all(db=Depends(get_db)):
    return inscripciones_repo.get_all(db)


@inscripciones_api.post('', response_model=InscripcionApi, status_code=201)
def post(datos: InscripcionSinId, db=Depends(get_db)):
    return inscripciones_repo.create(db, datos)
