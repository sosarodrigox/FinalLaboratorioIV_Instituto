from pydantic import BaseModel

# Modelo para crear:
class ProfesorSinId(BaseModel):
    nombre: str
    apellido: str
    dni: str
    # TODO: asegura que el valor contenga solo dígitos (\d) y tenga una longitud de 1 a 8 caracteres ({1,8})
    # dni: str = constr(regex=r'^\d{1,8}$')

    class Config:
        orm_mode = True

# Modelo completo:


class ProfesorApi(ProfesorSinId):
    id: int
