CREATE database TTR;

USE TTR;

-- Tabla grados
CREATE TABLE grados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grado VARCHAR(100) NOT NULL
);

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
	usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    grado_id INT,
    foto_perfil VARCHAR(255),
    FOREIGN KEY (grado_id) REFERENCES grados(id)
);


-- Tabla ejercicios
CREATE TABLE ejercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_grado INT,
    FOREIGN KEY (id_grado) REFERENCES grados(id)
);

-- Tabla insignias
CREATE TABLE insignias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_ejercicio INT,
    id_calif INT,
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id)
    -- Nota: id_calif como restricción dependerá de validación por lógica de negocio
);

-- Tabla calificaciones
CREATE TABLE calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    intento INT NOT NULL CHECK (intento BETWEEN 1 AND 5),
    calificacion DECIMAL(4,2) CHECK (calificacion >= 0 AND calificacion <= 10),
    id_ejercicio INT,
    id_usuario INT,
    id_insignia INT,
    fecha DATE,
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_insignia) REFERENCES insignias(id)
);

-- Tabla consejos
CREATE TABLE consejos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_ejercicio INT,
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id)
);