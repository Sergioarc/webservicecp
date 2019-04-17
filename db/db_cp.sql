-- Base de datos de los códigos postales de México
CREATE DATABASE cp_mexico
WITH OWNER = postgres
ENCODING = 'UTF8'
TABLESPACE = pg_default
LC_COLLATE = 'C'
LC_CTYPE = 'C'
CONNECTION LIMIT = -1;

-- Creación de la tabla estados con sus atributos
create table estados (
  id_estados serial NOT NULL PRIMARY KEY,
  nombre character varying(30) NOT NULL
 );

-- Creación de la tabla delegaciones con sus atributos
create table municipios (
  id_municipio serial NOT NULL PRIMARY KEY,
  nombre character varying(255) NOT NULL,
  id_estado integer NOT NULL,
  FOREIGN KEY (id_estado) REFERENCES estados (id_estados)
);

-- Creación de la tabla colonias con sus atributos
create table colonias (
  id_colonias serial NOT NULL PRIMARY KEY,
  id_municipio integer NOT NULL,
  nombre character varying(255) NOT NULL,
  cp character varying(10) NOT NULL,
  FOREIGN KEY (id_municipio) REFERENCES municipios (id_municipio)
);
