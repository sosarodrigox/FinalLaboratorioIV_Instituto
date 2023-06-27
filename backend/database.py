from sqlalchemy import create_engine

# Conexión a la Base de Datos
# Cadena de conexión: "driver_especifico+tipo_de_bd://memory:guarda_en_memoria,echo=true (log_querys)"
# Sintaxis en POSTGRES: "postgresql+psycopg2://user:password@host:port/dbname[?key=value&key=value...]"


SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:admin@localhost/instituto"

# Motor de conexión:
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
