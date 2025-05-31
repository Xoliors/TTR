const conn = require('../config/conexion');

// Función para contar intentos usando callbacks
const contarIntentos = (id_usuario, id_ejercicio, callback) => {
  conn.query(
    `SELECT COUNT(*) AS intentos 
     FROM calificaciones 
     WHERE id_usuario = ? AND id_ejercicio = ? 
     AND DATE(fecha) = CURDATE();`,
    [id_usuario, id_ejercicio],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].intentos);
    }
  );
};

// Función para guardar calificación usando callbacks
const guardarCalificacion = (intento, calificacion, id_ejercicio, id_usuario, fecha, callback) => {
  conn.query(
    `INSERT INTO calificaciones 
     (intento, calificacion, id_ejercicio, id_usuario, fecha) 
     VALUES (?, ?, ?, ?, ?)`,
    [intento, calificacion, id_ejercicio, id_usuario, fecha],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

module.exports = {
  contarIntentos,
  guardarCalificacion
};