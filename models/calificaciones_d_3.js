const conn = require('../config/conexion');

// Función para obtener calificaciones usando callbacks
const obtenerCalificacionesCI = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 36;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesCA = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 37;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesRF = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 38;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenerCalificacionesCI, obtenerCalificacionesCA, obtenerCalificacionesRF
};