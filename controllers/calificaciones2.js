// archivo: controllers/calificaciones2Controller.js
const { obtenercalificaciones2Ema, obtenercalificaciones2Ed, obtenercalificaciones2M, obtenercalificaciones2CM,
    obtenercalificaciones2TN, obtenercalificaciones2EN } = require('../models/calificaciones2');

const obtenercalificaciones2JSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2Ema(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2JSONED = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2Ed(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2JSONM = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2M(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2JSONCM = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2CM(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2JSONTN = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2TN(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2JSONEN = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2EN(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};



module.exports = { obtenercalificaciones2JSON, obtenercalificaciones2JSONED, obtenercalificaciones2JSONM, obtenercalificaciones2JSONTN,
    obtenercalificaciones2JSONCM, obtenercalificaciones2JSONEN
 };
