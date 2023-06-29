from api.profesores_api import profesores_api
from api.cursos_api import cursos_api
from api.alumnos_api import alumnos_api
from api.inscripciones_api import inscripciones_api
from fastapi.middleware.cors import CORSMiddleware  # Error de CORS
import database
from fastapi import FastAPI
import uvicorn
import models.cursos_bd
import models.profesores_bd
import models.alumnos_bd
import models.inscripciones_bd




# Crea las tablas que corresponden a las entidades definidas en los modelos de BD.
database.create_all()

# Crea servidor FastAPI
app = FastAPI()

# Rutas endopoints
app.include_router(cursos_api)
app.include_router(profesores_api)
app.include_router(alumnos_api)
app.include_router(inscripciones_api)

# Para solucionar erros de CORS POLICY - Valores de Midleware:
# https://fastapi.tiangolo.com/tutorial/cors/
# Importar: from fastapi.middleware.cors import CORSMiddleware
# LUEGO AGREGAR:
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run('instituto:app', reload=True)
