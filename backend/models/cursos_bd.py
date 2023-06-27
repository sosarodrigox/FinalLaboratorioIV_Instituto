# Modelo de curso para la BD (SQL Alchemy)
from database import BaseBd
from sqlalchemy import Column, DateTime, Integer, String


class CursoBd(BaseBd):
    __tablename__ = 'cursos'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(80), nullable=False)
    cantidad_alumnos = Column(Integer, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
