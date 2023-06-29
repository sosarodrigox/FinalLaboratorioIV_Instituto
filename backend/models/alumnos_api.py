from pydantic import BaseModel


class AlumnoSinId(BaseModel):
    nombre: str
    apellido: str
    dni: str
    # TODO: asegura que el valor contenga solo dígitos (\d) y tenga una longitud de 1 a 8 caracteres ({1,8})
    # dni: str = constr(regex=r'^\d{1,8}$')

    class Config:
        orm_mode = True


class AlumnoApi(AlumnoSinId):
    id: int
