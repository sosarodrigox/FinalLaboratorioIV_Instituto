# from datetime import date
# from models.cursos_api import CursoApi (Importado para hardcode de prueba)
from models.profesores_bd import ProfesorBd
from models.cursos_api import CursoSinId
from models.cursos_bd import CursoBd
from sqlalchemy.orm import Session
from sqlalchemy import or_, select


class CursosRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(CursoBd).order_by(
            CursoBd.nombre)).scalars().all()

    def get_by_id(self, id: int, db: Session):
        result = db.execute(select(CursoBd).where(CursoBd.id == id)).scalar()
        return result

    def get_cursos_profesor(self, id_profesor: int, db: Session):
        return db.query(CursoBd).filter(
            or_(
                CursoBd.profesor_titular_id == id_profesor,
                CursoBd.profesor_auxiliar_id == id_profesor
            )
        ).all()

    def create(self, db: Session, datos: CursoSinId):
        nueva_entidad_bd: CursoBd = CursoBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd

    def modify(self, id: int, datos: CursoSinId, db: Session):
        entidad: CursoBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        for k, v in datos.dict(exclude_unset=True).items():
            setattr(entidad, k, v)
        db.commit()
        return entidad

    def delete(self, id: int, db: Session):
        entidad: CursoBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        db.delete(entidad)
        db.commit()
        return entidad

    # HardCode para probar la API sin buscar datos de la BD.
    # def get_all(self):

    #     return [
    #         CursoApi(id=1, nombre='Matemética', cantidad_alumnos=30,
    #                  fecha_inicio=date(2023, 7, 19), fecha_fin=date(2023, 12, 19)),
    #         CursoApi(id=1, nombre='Lengua', cantidad_alumnos=20,
    #                  fecha_inicio=date(2023, 6, 1), fecha_fin=date(2023, 11, 1))
    #     ]
