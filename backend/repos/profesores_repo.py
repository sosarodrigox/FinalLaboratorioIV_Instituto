# from datetime import date
from models.cursos_bd import CursoBd
from models.profesores_api import ProfesorSinId
from models.profesores_bd import ProfesorBd
from sqlalchemy.orm import Session, contains_eager
from sqlalchemy import select


class ProfesoresRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(ProfesorBd).order_by(ProfesorBd.apellido)).scalars().all()

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

        # TODO: Actualizar los cursos que tienen asignado al profesor como profesor titular
        # o avisar que no se puede eliminar el profesro titular de un curso (Ver atributo de la BD)
        # cursos = db.query(CursoBd).filter(CursoBd.profesor_titular_id == id).all()
        # for curso in cursos:
        #     curso.profesor_titular_id = None

        db.delete(entidad)
        db.commit()
        return entidad
