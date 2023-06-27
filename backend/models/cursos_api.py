# Modelo de curso para la API
from pydantic import BaseModel
from datetime import date


class CursoApi(BaseModel):
    id: int
    nombre: str
    cantidad_alumnos: int
    fecha_inicio: date
    fecha_fin: date
    # TODO Ver si el prof titulay y el auxiliar son objetos completos o solo su id.
