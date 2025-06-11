const conn = require('../config/conexion');

// Función para obtener calificaciones3 usando callbacks
const obtenercalificaciones3Lb = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 30;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3LBa = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 31;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones3B = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones3 c
    INNER JOIN ejercicios3 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 3 
    AND c.id_usuario = ?
    AND e.id = 32;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};


module.exports = { obtenercalificaciones3Lb, obtenercalificaciones3LBa, obtenercalificaciones3B };