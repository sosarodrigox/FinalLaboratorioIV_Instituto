import database
from fastapi import FastAPI
import uvicorn
from api.cursos_api import cursos_api
import models.cursos_bd

#Crea las tablas que corresponden a las entidades definidas en los modelos de BD.
database.create_all()

# Crea servidor FastAPI
app = FastAPI()

# Rutas endopoints
app.include_router(cursos_api)


if __name__ == '__main__':
    uvicorn.run('instituto:app', reload=True)
