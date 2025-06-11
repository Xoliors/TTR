const conn = require('../config/conexion');

// Función para obtener calificaciones usando callbacks
const obtenerCalificaciones2H = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 33;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificacione2CT = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 34;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenerCalificaciones2CL = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 35;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenerCalificaciones2H, obtenerCalificacione2CT, obtenerCalificaciones2CL };