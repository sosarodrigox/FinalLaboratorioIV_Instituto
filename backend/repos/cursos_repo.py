from datetime import date
from models.cursos_api import CursoApi


class CursosRepositorio():

    def get_all(self):

        return [
            CursoApi(id=1, nombre='Matemética', cantidad_alumnos=30,
                     fecha_inicio=date(2023, 7, 19), fecha_fin=date(2023, 12, 19)),
            CursoApi(id=1, nombre='Lengua', cantidad_alumnos=20,
                     fecha_inicio=date(2023, 6, 1), fecha_fin=date(2023, 11, 1))
        ]
