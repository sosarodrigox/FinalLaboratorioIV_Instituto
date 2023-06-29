from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import BaseBd


class AlumnoBd(BaseBd):
    __tablename__ = 'alumnos'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    dni = Column(String(8), nullable=False, unique=True)

    # Lazy Loading
    # Relationships (Atributos de navegación):
    # Cursos en los que está inscripto
    curso = relationship("InscripcionBd", back_populates='alumno')

    def __repr__(self):
        return f"<Alumno(Apellido={self.apellido} nombre={self.nombre})>"
