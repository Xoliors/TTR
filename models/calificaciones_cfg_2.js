const conn = require('../config/conexion');

// Función para obtener calificaciones2 usando callbacks
const obtenercalificaciones2CCyFG = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 26;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2jFiguras = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 27;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2Cobjetos = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 28;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};

const obtenercalificaciones2memorama = (id_usuario, callback) => {
  const query = `
    SELECT c.id, e.nombre, c.calificacion, c.intento, c.fecha
    FROM calificaciones2 c
    INNER JOIN ejercicios2 e ON e.id = c.id_ejercicio
    WHERE e.id_grado = 2 
    AND c.id_usuario = ?
    AND e.id = 29;
  `;
  console.log(query)
  conn.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // Devuelve el arreglo completo de resultados
  });
};


module.exports = { obtenercalificaciones2CCyFG, obtenercalificaciones2jFiguras, obtenercalificaciones2Cobjetos, obtenercalificaciones2memorama
};