from sqlalchemy.orm import Session
from sqlalchemy import select
from models.inscripciones_bd import InscripcionBd
from models.alumnos_api import AlumnoSinId
from models.alumnos_bd import AlumnoBd


class AlumnosRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(AlumnoBd).order_by(AlumnoBd.apellido)).scalars().all()

    def get_by_id(self, id: int, db: Session):
        result = db.execute(select(AlumnoBd).where(
            AlumnoBd.id == id)).scalar()
        return result

    def create(self, db: Session, datos: AlumnoSinId):
        nueva_entidad_bd: AlumnoBd = AlumnoBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd

    def modify(self, id: int, datos: AlumnoSinId, db: Session):
        entidad: AlumnoBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        for k, v in datos.dict(exclude_unset=True).items():
            setattr(entidad, k, v)
        db.commit()
        return entidad

    def delete(self, id: int, db: Session):
        entidad: AlumnoBd = self.get_by_id(id, db)
        if entidad is None:
            return None
        # Eliminar las inscripciones asociadas al alumno
        db.query(InscripcionBd).filter(InscripcionBd.id_alumno == id).delete()
        db.delete(entidad)
        db.commit()
        return entidad
