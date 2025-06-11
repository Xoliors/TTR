// archivo: controllers/calificaciones3Controller.js
const { obtenercalificaciones3CCyFG, obtenercalificaciones3jFiguras, obtenercalificaciones3Cobjetos, obtenercalificaciones3memorama } = require('../models/calificaciones_cfg_3');

const obtenercalificaciones3CCyFGJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3CCyFG(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3jFigurasJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3jFiguras(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3CobjetosJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3Cobjetos(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};

const obtenercalificaciones3memoramaJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3memorama(id_usuario, (err, calificaciones3) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones3);
  });
};


module.exports = { obtenercalificaciones3CCyFGJSON, obtenercalificaciones3jFigurasJSON, obtenercalificaciones3CobjetosJSON, obtenercalificaciones3memoramaJSON
 };
