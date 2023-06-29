from pydantic import BaseModel
from datetime import date


class InscripcionSinId(BaseModel):
    id_alumno: int
    id_curso: int
    fecha_inicio_inscripcion: date
    fecha_fin_inscripcion: date

    class Config:
        orm_mode = True


class InscripcionApi(InscripcionSinId):
    id: int

# TODO: Respuesta de tipo InscripcionSinId, y se encontró un valor None que
# no es permitido en el campo response de esa respuesta. Solucionar nulos cuando
# no hay inscripciones en metodo get_all
