from sqlalchemy import Column, DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import relationship
from database import BaseBd

class AsistenciaBd(BaseBd):
    __tablename__ = 'asistencias'

    id_alumno = Column(Integer, ForeignKey('alumnos.id'), primary_key=True)
    id_curso = Column(Integer , ForeignKey('cursos.id'), primary_key=True)
    fecha = Column(DateTime,  primary_key=True)
    asistio = Column(Boolean, nullable = False, default=True)

    alumno = relationship('AlumnoBd', back_populates = 'asistencias')
    curso = relationship('CursoBd', back_populates = 'asistencias')