const conn = require('../config/conexion');

// Función para obtener calificaciones2 usando callbacks
const obtenercalificaciones2T = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 7;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2SF = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 8;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2C = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 9;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2SV = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 10;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2RV = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 11;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2Ca = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 12;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2SR = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 13;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenercalificaciones2T, obtenercalificaciones2SF, obtenercalificaciones2C, obtenercalificaciones2SV,
    obtenercalificaciones2RV, obtenercalificaciones2Ca, obtenercalificaciones2SR };