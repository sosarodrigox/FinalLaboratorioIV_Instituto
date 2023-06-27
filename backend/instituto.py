from fastapi import FastAPI
import uvicorn
from api.cursos_api import cursos_api


# Crea servidor FastAPI
app = FastAPI()

# Rutas endopoints
app.include_router(cursos_api)

if __name__ == '__main__':
    uvicorn.run('instituto:app', reload=True)
