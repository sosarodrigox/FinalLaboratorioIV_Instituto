from sqlalchemy import and_, select
from sqlalchemy.orm import Session
from models.alumnos_bd import AlumnoBd
from models.cursos_bd import CursoBd
from models.inscripciones_bd import InscripcionBd
from models.inscripciones_api import InscripcionSinId


class InscripcionesRepositorio():

    # Devuelve una lista de alumnos inscriptos en un curso particular:
    def get_alumnos_curso(self, id_curso, db: Session):
        alumnos_curso = db.query(AlumnoBd).join(InscripcionBd).filter(
            InscripcionBd.id_curso == id_curso).all()
        if len(alumnos_curso) == 0:
            return None
        return alumnos_curso

    def get_all(self, db: Session):
        return db.execute(select(InscripcionBd).order_by(
            InscripcionBd.fecha_inicio_inscripcion)).scalars().all()

    def get_by_id(self, id_alumno: int, id_curso: int, db: Session):
        result = db.execute(select(InscripcionBd).where(and_(
            InscripcionBd.id_alumno == id_alumno,
            InscripcionBd.id_curso == id_curso
        ))).scalar()
        return result

    def create(self, db: Session, datos: InscripcionSinId):
        nueva_entidad_bd: InscripcionBd = InscripcionBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd
