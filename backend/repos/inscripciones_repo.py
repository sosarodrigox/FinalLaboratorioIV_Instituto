from sqlalchemy import select
from sqlalchemy.orm import Session
from models.inscripciones_bd import InscripcionBd
from models.inscripciones_api import InscripcionSinId


class InscripcionesRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(InscripcionBd).order_by(
            InscripcionBd.fecha_inicio_inscripcion)).scalars().all

    # def get_by_id(self, id: int, db: Session):
    #     result = db.execute(select(InscripcionBd).where(InscripcionBd == id)).scalar()
    #     return result

    def create(self, db: Session, datos: InscripcionSinId):
        nueva_entidad_bd: InscripcionBd = InscripcionBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd
