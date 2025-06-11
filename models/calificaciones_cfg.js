const conn = require('../config/conexion');

// Función para obtener calificaciones usando callbacks
const obtenerCalificacionesCCyFG = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 14;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesjFiguras = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 15;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesCobjetos = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 16;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacionesmemorama = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones c
    INNER JOIN ejercicios e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 1 
    AND c.id_usuario = ?
    AND e.id = 17;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};


module.exports = { obtenerCalificacionesCCyFG, obtenerCalificacionesjFiguras, obtenerCalificacionesCobjetos, obtenerCalificacionesmemorama
};