// models/reporte.js
const db = require('../config/conexion');

module.exports = {
  obtenerPromediosPorEjercicio (id_usuario, callback) {
  const query = `
    SELECT e.nombre, AVG(c.calificacion) AS promedio
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON c.id_ejercicio = e.id
    WHERE c.id_usuario = ?
    GROUP BY c.id_ejercicio
  `;
  db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
},

  
  obtenercalificacionesPorFecha(id_usuario, callback) {
    const query = `
      SELECT DATE(c.fecha) AS fecha, AVG(c.calificacion) AS calificacion
      FROM calificaciones2 c
      WHERE c.id_usuario = ?
      GROUP BY DATE(c.fecha)
      ORDER BY fecha ASC
    `;
    db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  },

  obtenerRendimientoPorEjercicio(id_usuario, callback) {
    const query = `
      SELECT e.nombre AS ejercicio, COUNT(c.id) AS cantidad
      FROM calificaciones2 c
      JOIN ejercicios2 e ON c.id_ejercicio = e.id
      WHERE c.id_usuario = ?
      GROUP BY e.nombre
    `;
    db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  },

  obtenerIntentosPorEjercicio(id_usuario, callback) {
    const query = `
      SELECT e.nombre AS ejercicio, SUM(c.intento) AS intentos
      FROM calificaciones2 c
      JOIN ejercicios2 e ON c.id_ejercicio = e.id
      WHERE c.id_usuario = ?
      GROUP BY e.nombre
    `;
    db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
  }
};