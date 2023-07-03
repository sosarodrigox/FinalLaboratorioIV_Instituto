from pydantic import BaseModel
from datetime import date


class AsistenciaApi(BaseModel):
    id_alumno: int
    id_curso: int
    fecha: date
    asistio: bool

    class Config:
        orm_mode = True

# class AsistenciaList(AsistenciaSinId):
#     nombre: str
#     apellido: str
#     estado_asistencia: bool
