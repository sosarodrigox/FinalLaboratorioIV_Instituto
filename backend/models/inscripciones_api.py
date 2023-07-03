from pydantic import BaseModel
from datetime import date


class InscripcionSinId(BaseModel):
    id_alumno: int
    id_curso: int
    fecha: date

    class Config:
        orm_mode = True


class InscripcionApi(InscripcionSinId):
    id_alumno: int
    id_curso: int

# TODO: Respuesta de tipo InscripcionSinId, y se encontró un valor None que
# no es permitido en el campo response de esa respuesta. Solucionar nulos cuando
# no hay inscripciones en metodo get_all

# TODO: Elegir otro nombre para InscripciónApi e InscripcionSinId (Los ids ya vienen creados y se concatenan)
