# Modelo de curso para la BD (SQL Alchemy)
from database import BaseBd
from sqlalchemy import CheckConstraint, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class CursoBd(BaseBd):
    __tablename__ = 'cursos'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(80), nullable=False)
    cantidad_alumnos = Column(Integer, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    profesor_titular_id = Column(
        Integer, ForeignKey('profesores.id'), nullable=False)
    profesor_auxiliar_id = Column(
        Integer, ForeignKey('profesores.id'), nullable=True)

    # Lazy Loading
    # Relationships (Atributos de navegación):
    # Profesores
    profesor_titular = relationship("ProfesorBd", foreign_keys=[
                                    profesor_titular_id], back_populates="cursos_titular")
    profesor_auxiliar = relationship("ProfesorBd", foreign_keys=[
                                     profesor_auxiliar_id], back_populates="cursos_auxiliar")
    # Alumnos
    alumnos = relationship(
        "InscripcionBd", cascade="all, delete", back_populates='curso')

    # Asistencias
    asistencias = relationship(
        "AsistenciaBd", cascade="all, delete", back_populates="curso")

    def __repr__(self):
        return f"<Curso(nombre={self.nombre}, fecha_inicio={self.fecha_inicio} - fecha_fin={self.fecha_fin})>"

    # Verificar que como máx haya un un prof aux y no sea el mismo que el titular TODO: (Revisar)
    __table_args__ = (
        CheckConstraint(
            'profesor_auxiliar_id IS NULL OR profesor_titular_id != profesor_auxiliar_id', name='profesores_distintos'),
    )
