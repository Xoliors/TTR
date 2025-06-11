// models/reporte.js
const db = require('../config/conexion');

module.exports = {
  obtenerPromediosPorEjercicio (id_usuario, callback) {
  const query = `
    SELECT e.nombre, AVG(c.calificacion) AS promedio
    FROM calificaciones c
    INNER JOIN ejercicios e ON c.id_ejercicio = e.id
    WHERE c.id_usuario = ?
    GROUP BY e.nombre
    `;
    db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  },

  
  obtenerCalificacionesPorFecha(id_usuario, callback) {
    const sql = `
      SELECT DATE(c.fecha) AS fecha, AVG(c.calificacion) AS calificacion
      FROM calificaciones c
      WHERE c.id_usuario = ?
      GROUP BY DATE(c.fecha)
      ORDER BY fecha ASC
    `;
    db.query(sql, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  },

  obtenerRendimientoPorEjercicio(id_usuario, callback) {
    const sql = `
      SELECT e.nombre AS ejercicio, COUNT(c.id) AS cantidad
      FROM calificaciones c
      JOIN ejercicios e ON c.id_ejercicio = e.id
      WHERE c.id_usuario = ?
      GROUP BY e.nombre
    `;
    db.query(sql, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  },

  obtenerIntentosPorEjercicio(id_usuario, callback) {
    const sql = `
      SELECT e.nombre AS ejercicio, SUM(c.intento) AS intentos
      FROM calificaciones c
      JOIN ejercicios e ON c.id_ejercicio = e.id
       WHERE c.id_usuario = ?
      GROUP BY e.nombre
    `;
    db.query(sql, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  }
};