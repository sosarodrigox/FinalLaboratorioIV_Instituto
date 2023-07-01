# Modelo de curso para la API
from pydantic import BaseModel
from datetime import date
from models.profesores_api import ProfesorApi

#Modelo para crear:
class CursoSinId(BaseModel):
    nombre: str
    cantidad_alumnos: int
    fecha_inicio: date
    fecha_fin: date
    # TODO Ver si el prof titulay y el auxiliar son objetos completos o solo su id.
    profesor_titular_id: int
    profesor_auxiliar_id: int = None

    # Clase necesaria para el mapeo SQL Alchemy -> FastAPI
    class Config:  # Al mapear una instancia de la BD no busca un diccionario si no que trata de acceder a cada elemento con la instancia.atributo
        orm_mode = True

#Listado de cursos con obj profesor
class CursoList(CursoSinId):
    profesor_titular: ProfesorApi
    profesor_auxiliar: ProfesorApi = None
     
#Modelo completo:
class CursoApi(CursoSinId):
    id: int
    