// archivo: controllers/calificaciones3Controller.js
const { obtenercalificaciones3Ema, obtenercalificaciones3Ed, obtenercalificaciones3M, obtenercalificaciones3CM,
    obtenercalificaciones3TN, obtenercalificaciones3EN } = require('../models/calificaciones3');

const obtenercalificaciones3JSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3Ema(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3JSONED = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3Ed(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3JSONM = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3M(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3JSONCM = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3CM(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3JSONTN = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3TN(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3JSONEN = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3EN(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};



module.exports = { obtenercalificaciones3JSON, obtenercalificaciones3JSONED, obtenercalificaciones3JSONM, obtenercalificaciones3JSONTN,
    obtenercalificaciones3JSONCM, obtenercalificaciones3JSONEN
 };
