
from sqlalchemy import Column, DateTime, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from database import BaseBd


class InscripcionBd(BaseBd):
    __tablename__ = 'inscripciones'

    # Constraint para evitar doble inscripción
    __table_args__ = (
        UniqueConstraint('id_curso', 'id_alumno', name='unique_curso_alumno'),
    )

    id_alumno = Column(Integer, ForeignKey('alumnos.id'), primary_key=True)
    id_curso = Column(Integer, ForeignKey('cursos.id'), primary_key=True)
    fecha = Column(DateTime)

    alumno = relationship('AlumnoBd', back_populates='curso')
    curso = relationship('CursoBd', back_populates='alumnos')

    def __repr__(self):
        return f'Inscripcion de {self.alumno.nombre} al curso {self.curso.nombre}'
