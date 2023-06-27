# Modelo de curso para la API
from pydantic import BaseModel


class Curso(BaseModel):
    id: int
    nombre: str
