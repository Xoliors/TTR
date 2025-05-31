const conn = require('../config/conexion');

// Función para obtener calificaciones usando callbacks
const obtenerCalificacionesEma = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 1;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesEd = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 2;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesM = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 3;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesCM = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 4;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesTN = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 5;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesEN = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 6;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenerCalificacionesEma, obtenerCalificacionesEd, obtenerCalificacionesM, obtenerCalificacionesCM,
    obtenerCalificacionesTN, obtenerCalificacionesEN
 };