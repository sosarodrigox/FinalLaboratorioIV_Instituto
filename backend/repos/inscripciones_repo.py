from datetime import datetime, time
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

    def get_cursos_alumno(self, id_alumno: int, db: Session):
        alumno_cursos = db.query(CursoBd).join(InscripcionBd).filter(
            InscripcionBd.id_alumno == id_alumno).all()
        if not alumno_cursos:
            return None
        return alumno_cursos

    def get_all(self, db: Session):
        return db.execute(select(InscripcionBd).order_by(
            InscripcionBd.fecha)).scalars().all()

    def get_by_id(self, id_alumno: int, id_curso: int, db: Session):
        result = db.execute(select(InscripcionBd).where(and_(
            InscripcionBd.id_alumno == id_alumno,
            InscripcionBd.id_curso == id_curso
        ))).scalar()
        return result

    def create(self, db: Session, datos: InscripcionSinId):
        nueva_entidad_bd: InscripcionBd = InscripcionBd(**datos.dict())

        # Verificar la cantidad de alumnos inscritos en el curso
        curso: CursoBd = db.query(CursoBd).get(datos.id_curso)
        if curso and len(curso.alumnos) >= curso.cantidad_alumnos:
            return "CURSO_COMPLETO"

        # Verificar las fechas de inicio y fin de la inscripción
        fecha_inscripcion = datetime.combine(datos.fecha, time())
        if curso and (fecha_inscripcion < curso.fecha_inicio or fecha_inscripcion > curso.fecha_fin):
            return "CURSO_CERRADO"

        # Si se valida lo carga a la bd:
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd
