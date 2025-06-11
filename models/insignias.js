const conn = require('../config/conexion');

module.exports = {
  // Consulta todas las insignias de grado 1
  getAllInsignias1: (callback) => {
    conn.query('SELECT * FROM insignias', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Consulta todas las insignias de grado 2
  getAllInsignias2: (callback) => {
    conn.query('SELECT * FROM insignias2', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Consulta todas las insignias de grado 3
  getAllInsignias3: (callback) => {
    conn.query('SELECT * FROM insignias3', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  obtenerInsigniasPorPromedios: (id_usuario, callback) => {
  const rangos = [
    { ejercicios: [1, 6],    insignias: [1, 2, 3] },
    { ejercicios: [7, 13],   insignias: [4, 5, 6] },
    { ejercicios: [14, 17],  insignias: [7, 8, 9] },
    { ejercicios: [18, 20],  insignias: [10, 11, 12] },
    { ejercicios: [21, 23],  insignias: [13, 14, 15] },
    { ejercicios: [24, 26],  insignias: [16, 17, 18] }
  ];

  const insigniasObtenidas = [];
  let consultasCompletadas = 0;

  rangos.forEach((rango, index) => {
    const query = `
      SELECT AVG(c.calificacion) AS promedio
      FROM calificaciones c
      WHERE c.id_usuario = ? AND c.id_ejercicio BETWEEN ? AND ?
    `;

    conn.query(query, [id_usuario, rango.ejercicios[0], rango.ejercicios[1]], (err, results) => {
      if (err) return callback(err);

      const promedio = results[0].promedio;

      if (promedio !== null) {
        let insigniaId;
        if (promedio >= 1 && promedio <= 5) {
          insigniaId = rango.insignias[0];
        } else if (promedio > 5 && promedio <= 9) {
          insigniaId = rango.insignias[1];
        } else if (promedio === 10) {
          insigniaId = rango.insignias[2];
        }

        if (insigniaId) {
          conn.query('SELECT * FROM insignias WHERE id = ?', [insigniaId], (err, insigniaResult) => {
            if (err) return callback(err);
            insigniasObtenidas.push(insigniaResult[0]);
            finalizar();
          });
        } else {
          finalizar();
        }
      } else {
        finalizar(); // no hay promedio en ese rango
      }
    });
  });

  function finalizar() {
    consultasCompletadas++;
    if (consultasCompletadas === rangos.length) {
      callback(null, insigniasObtenidas);
    }
  }
},

obtenerInsigniasPorPromedios2: (id_usuario, callback) => {
  const rangos = [
    { ejercicios: [1, 6],    insignias: [1, 2, 3] },
    { ejercicios: [7, 13],   insignias: [4, 5, 6] },
    { ejercicios: [14, 25],  insignias: [7, 8, 9] },
    { ejercicios: [26, 39],  insignias: [10, 11, 12] },
    { ejercicios: [30, 32],  insignias: [13, 14, 15] },
    { ejercicios: [33, 35],  insignias: [16, 17, 18] },
    { ejercicios: [36, 38],  insignias: [19, 20, 21] }
  ];

  const insigniasObtenidas = [];
  let consultasCompletadas = 0;

  rangos.forEach((rango, index) => {
    const query = `
      SELECT AVG(c.calificacion) AS promedio
      FROM calificaciones2 c
      WHERE c.id_usuario = ? AND c.id_ejercicio BETWEEN ? AND ?
    `;

    conn.query(query, [id_usuario, rango.ejercicios[0], rango.ejercicios[1]], (err, results) => {
      if (err) return callback(err);

      const promedio = results[0].promedio;

      if (promedio !== null) {
        let insigniaId;
        if (promedio >= 1 && promedio <= 5) {
          insigniaId = rango.insignias[0];
        } else if (promedio > 5 && promedio <= 9) {
          insigniaId = rango.insignias[1];
        } else if (promedio === 10) {
          insigniaId = rango.insignias[2];
        }

        if (insigniaId) {
          conn.query('SELECT * FROM insignias2 WHERE id = ?', [insigniaId], (err, insigniaResult) => {
            if (err) return callback(err);
            insigniasObtenidas.push(insigniaResult[0]);
            finalizar();
          });
        } else {
          finalizar();
        }
      } else {
        finalizar(); // no hay promedio en ese rango
      }
    });
  });

  function finalizar() {
    consultasCompletadas++;
    if (consultasCompletadas === rangos.length) {
      callback(null, insigniasObtenidas);
    }
  }
},

obtenerInsigniasPorPromedios3: (id_usuario, callback) => {
  const rangos = [
    { ejercicios: [1, 6],    insignias: [1, 2, 3] },
    { ejercicios: [7, 13],   insignias: [4, 5, 6] },
    { ejercicios: [14, 25],  insignias: [7, 8, 9] },
    { ejercicios: [26, 39],  insignias: [10, 11, 12] },
    { ejercicios: [30, 32],  insignias: [13, 14, 15] },
    { ejercicios: [33, 35],  insignias: [16, 17, 18] },
    { ejercicios: [36, 38],  insignias: [19, 20, 21] }
  ];

  const insigniasObtenidas = [];
  let consultasCompletadas = 0;

  rangos.forEach((rango, index) => {
    const query = `
      SELECT AVG(c.calificacion) AS promedio
      FROM calificaciones3 c
      WHERE c.id_usuario = ? AND c.id_ejercicio BETWEEN ? AND ?
    `;

    conn.query(query, [id_usuario, rango.ejercicios[0], rango.ejercicios[1]], (err, results) => {
      if (err) return callback(err);

      const promedio = results[0].promedio;

      if (promedio !== null) {
        let insigniaId;
        if (promedio >= 1 && promedio <= 5) {
          insigniaId = rango.insignias[0];
        } else if (promedio > 5 && promedio <= 9) {
          insigniaId = rango.insignias[1];
        } else if (promedio === 10) {
          insigniaId = rango.insignias[2];
        }

        if (insigniaId) {
          conn.query('SELECT * FROM insignias3 WHERE id = ?', [insigniaId], (err, insigniaResult) => {
            if (err) return callback(err);
            insigniasObtenidas.push(insigniaResult[0]);
            finalizar();
          });
        } else {
          finalizar();
        }
      } else {
        finalizar(); // no hay promedio en ese rango
      }
    });
  });

  function finalizar() {
    consultasCompletadas++;
    if (consultasCompletadas === rangos.length) {
      callback(null, insigniasObtenidas);
    }
  }
},

};
