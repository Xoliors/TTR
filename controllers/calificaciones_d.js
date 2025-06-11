// archivo: controllers/calificacionesController.js
const { obtenerCalificacionesG, obtenerCalificacionesD, obtenerCalificacionesA } = require('../models/calificaciones_d');

const obtenerCalificacionesJSONG = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesG(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificacionesJSOND = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesD(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificacionesJSONA = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesA(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};


module.exports = { obtenerCalificacionesJSONG, obtenerCalificacionesJSOND, obtenerCalificacionesJSONA
 };
