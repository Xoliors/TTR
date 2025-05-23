const conn = require('../config/conexion');

// Función para contar los intentos del usuario en un ejercicio en los últimos 7 días
const contarIntentos = async (id_usuario, id_ejercicio) => {
  const [result] = await conn.query(
    `SELECT COUNT(*) AS intentos 
     FROM calificaciones 
     WHERE id_usuario = ? AND id_ejercicio = ? 
     AND fecha >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
    [id_usuario, id_ejercicio]
  );
  return result[0].intentos;
};

// Función para guardar una calificación
const guardarCalificacion = async (intento, calificacion, id_ejercicio, id_usuario, id_insignia, fecha) => {
  await conn.query(
    `INSERT INTO calificaciones 
     (intento, calificacion, id_ejercicio, id_usuario, id_insignia, fecha) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [intento, calificacion, id_ejercicio, id_usuario, id_insignia, fecha]
  );
};

module.exports = {
  contarIntentos,
  guardarCalificacion
};
