// archivo: controllers/calificacionesController.js
const { obtenercalificaciones2Lb, obtenercalificaciones2LBa, obtenercalificaciones2B } = require('../models/calificaciones_lmc2');

const obtenerCalificaciones2JSONLB = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2Lb(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONLBA = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2LBa(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONB = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2B(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};



module.exports = { obtenerCalificaciones2JSONLB, obtenerCalificaciones2JSONLBA, obtenerCalificaciones2JSONB }
