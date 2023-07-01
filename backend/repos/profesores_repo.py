# from datetime import date
from models.cursos_bd import CursoBd
from models.profesores_api import ProfesorSinId
from models.profesores_bd import ProfesorBd
from sqlalchemy.orm import Session, contains_eager
from sqlalchemy import select


class ProfesoresRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(ProfesorBd).order_by(ProfesorBd.apellido)).scalars().all()

    def get_cursos_profesor(self, id: int, db: Session):
        cursos_profesor = db.query(CursoBd).join(ProfesorBd).filter(
            ProfesorBd.id
        )
        if len(cursos_profesor) == 0:
            return None
        return cursos_profesor

    def get_by_id(self, id: int, db: Session):
        result = db.execute(select(ProfesorBd).where(
            ProfesorBd.id == id)).scalar()
        return result

    def create(self, db: Session, datos: ProfesorSinId):
        nueva_entidad_bd: ProfesorBd = ProfesorBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd

    def modify(self, id: int, datos: ProfesorSinId, db: Session):
        entidad: ProfesorBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        for k, v in datos.dict(exclude_unset=True).items():
            setattr(entidad, k, v)
        db.commit()
        return entidad

    def delete(self, id: int, db: Session):
        entidad: ProfesorBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        db.delete(entidad)
        db.commit()
        return entidad
