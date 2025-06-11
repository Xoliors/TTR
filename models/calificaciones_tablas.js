const conn = require('../config/conexion');

// Función para obtener calificaciones2 usando callbacks
const obtenercalificaciones2_1 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 14;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_2 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 15;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_3 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 16;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_4 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 17;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_5 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 18;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_6 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 19;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_7 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 20;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_8 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 21;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_9 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 22;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2_10 = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 23;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2FF = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 24;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2G = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2
    AND c.id_usuario = ?
    AND e.id = 25;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

module.exports = { obtenercalificaciones2_1, obtenercalificaciones2_2, obtenercalificaciones2_3, obtenercalificaciones2_4,
    obtenercalificaciones2_5, obtenercalificaciones2_6, obtenercalificaciones2_7, obtenercalificaciones2_8,
    obtenercalificaciones2_9, obtenercalificaciones2_10, obtenercalificaciones2FF, obtenercalificaciones2G
 };