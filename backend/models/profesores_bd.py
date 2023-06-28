
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.cursos_bd import CursoBd
from database import BaseBd


class ProfesorBd(BaseBd):
    __tablename__ = 'profesores'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    # TODO Validar que sean dígitos en la API
    dni = Column(String(8), nullable=False, unique=True)

    # Lazy Loading
    # Relationships (Atributos de navegación):
    # Cursos Asignados
    cursos_titular = relationship("CursoBd", foreign_keys=[
                                  CursoBd.profesor_titular_id], back_populates="profesor_titular")  # TODO VER TEORIA: BACK_POPULATES
    cursos_auxiliar = relationship("CursoBd", foreign_keys=[
                                   CursoBd.profesor_auxiliar_id], back_populates="profesor_auxiliar")

    def __repr__(self):
        return f"<Profesor(Apellido={self.apellido} nombre={self.nombre})>"
