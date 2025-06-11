// archivo: controllers/calificaciones2Controller.js
const { obtenercalificaciones2CCyFG, obtenercalificaciones2jFiguras, obtenercalificaciones2Cobjetos, obtenercalificaciones2memorama } = require('../models/calificaciones_cfg_2');

const obtenercalificaciones2CCyFGJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2CCyFG(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2jFigurasJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2jFiguras(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2CobjetosJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2Cobjetos(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};

const obtenercalificaciones2memoramaJSON = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones2memorama(id_usuario, (err, calificaciones2) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones2);
  });
};


module.exports = { obtenercalificaciones2CCyFGJSON, obtenercalificaciones2jFigurasJSON, obtenercalificaciones2CobjetosJSON, obtenercalificaciones2memoramaJSON
 };
