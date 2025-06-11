// archivo: controllers/calificacionesController.js
const { obtenerCalificacionesLb, obtenerCalificacionesLBa, obtenerCalificacionesCo } = require('../models/calificaciones_lmc');

const obtenerCalificacionesJSONLB = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesLb(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificacionesJSONLBA = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesLBa(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificacionesJSONCO = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenerCalificacionesCo(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};



module.exports = { obtenerCalificacionesJSONLB, obtenerCalificacionesJSONLBA, obtenerCalificacionesJSONCO }
