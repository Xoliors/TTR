const conn = require('../config/conexion');

// Función para obtener calificaciones usando callbacks
const obtenerCalificacionesI = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 21;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesCT = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 22;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesDIA = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 23;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenerCalificacionesI, obtenerCalificacionesCT, obtenerCalificacionesDIA
};