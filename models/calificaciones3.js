const conn = require('../config/conexion');

// Función para obtener calificaciones3 usando callbacks
const obtenercalificaciones3Ema = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 1;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3Ed = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 2;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3M = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 3;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3CM = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 4;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3TN = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 5;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3EN = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 6;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenercalificaciones3Ema, obtenercalificaciones3Ed, obtenercalificaciones3M, obtenercalificaciones3CM,
    obtenercalificaciones3TN, obtenercalificaciones3EN
 };