// archivo: controllers/calificacionesController.js
const { obtenercalificaciones2T, obtenercalificaciones2SF, obtenercalificaciones2C, obtenercalificaciones2SV,
    obtenercalificaciones2RV, obtenercalificaciones2Ca, obtenercalificaciones2SR } = require('../models/calificaciones_sr2');

const obtenerCalificaciones2JSONT = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2T(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONSF = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2SF(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONC = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2C(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONSV = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2SV(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONRV = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2RV(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenerCalificaciones2JSONCa = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2Ca(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};


const obtenerCalificaciones2JSONSR = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2SR(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

module.exports = { obtenerCalificaciones2JSONT, obtenerCalificaciones2JSONSF, obtenerCalificaciones2JSONC, obtenerCalificaciones2JSONSV,
  obtenerCalificaciones2JSONRV, obtenerCalificaciones2JSONCa, obtenerCalificaciones2JSONSR
 };
