from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Conexión a la Base de Datos
# Cadena de conexión: "driver_especifico+tipo_de_bd://memory:guarda_en_memoria,echo=true (log_querys)"
# Sintaxis en POSTGRES: "postgresql+psycopg2://user:password@host:port/dbname[?key=value&key=value...]"


SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:1234@localhost/instituto"
# SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:admin@localhost/instituto"

# Motor de conexión:
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Sesión para acceder a la conexión con la BD. (Reemplaza el with) sessionmaker(motor, autocommit=False)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Clase base para manejar las entidades con el ORM
BaseBd = declarative_base()

# Función para usar inyección de dependencias en FastAPI, devuelve yield, utiliza la bd hasta que se termine de usar o llame a next()


def get_db():
    db = SessionLocal()
    try:
        # Se sigue ejecutando hasta que se termine de usar y luego continúa con el código
        yield db
    finally:
        db.close()

# Crea todas las bd en base a las entidades que haya definidas:


def create_all():
    BaseBd.metadata.create_all(bind=engine)

# Elimina todas las bd en base a las entidades que haya definidas:


def drop_all():
    BaseBd.metadata.drop_all(bind=engine)
