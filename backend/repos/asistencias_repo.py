from datetime import date
from sqlalchemy import and_, select
from sqlalchemy.orm import Session
from models.asistencias_api import AsistenciaApi
from models.asistencias_bd import AsistenciaBd


class AsistenciasRepositorio():

    def get_asistencia_alu_cur_fec(self, id_alumno: int, id_curso: int, fecha: date, db: Session):
        result = db.execute(select(AsistenciaBd).where(and_(
            AsistenciaBd.id_alumno == id_alumno,
            AsistenciaBd.id_curso == id_curso,
            AsistenciaBd.fecha == fecha
        ))).scalar()
        return result

    # def get_asistencia_by_alumno_curso_fecha(self, id_alumno: int, id_curso: int, fecha: date, db: Session):
    #     result = db.query(AsistenciaBd).filter(
    #         AsistenciaBd.id_alumno == id_alumno,
    #         AsistenciaBd.id_curso == id_curso,
    #         AsistenciaBd.fecha == fecha
    #     ).first()
    #     return result

    def create(self, db: Session, datos: AsistenciaApi):
        nueva_entidad_bd: AsistenciaBd = AsistenciaBd(**datos.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd
