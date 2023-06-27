from fastapi import APIRouter
from repos.cursos_repo import CursosRepositorio

# Router:
cursos_api = APIRouter(prefix='/cursos')

# Repos:
cursos_repo = CursosRepositorio()


# Endpoint lista de cursos:
@cursos_api.get('')
def get_all():
    result = cursos_repo.get_all()
    return result
