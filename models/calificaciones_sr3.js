const conn = require('../config/conexion');

// Función para obtener calificaciones3 usando callbacks
const obtenercalificaciones3T = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 7;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3SF = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 8;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3C = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 9;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3SV = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 10;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3RV = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 11;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3Ca = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 12;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3SR = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3
    AND c.id_usuario = ?
    AND e.id = 13;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenercalificaciones3T, obtenercalificaciones3SF, obtenercalificaciones3C, obtenercalificaciones3SV,
    obtenercalificaciones3RV, obtenercalificaciones3Ca, obtenercalificaciones3SR };