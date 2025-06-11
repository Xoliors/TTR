// archivo: controllers/calificacionesController.js
const { obtenercalificaciones3_1, obtenercalificaciones3_2, obtenercalificaciones3_3, obtenercalificaciones3_4,
    obtenercalificaciones3_5, obtenercalificaciones3_6, obtenercalificaciones3_7, obtenercalificaciones3_8,
    obtenercalificaciones3_9, obtenercalificaciones3_10, obtenercalificaciones3FF, obtenercalificaciones3G } = require('../models/calificaciones_tablas3');

const obtenercalificaciones3JSON1 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_1(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON2 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_2(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON3 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_3(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON4 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_4(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON5 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_5(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON6 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_6(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};


const obtenercalificaciones3JSON7 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_7(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON8 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_8(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON9 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_9(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSON10 = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3_10(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSONFF = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3FF(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

const obtenercalificaciones3JSONG = (req, res) => {
  const id_usuario = req.session.id_usuario;  // <-- aquí usas id_usuario como en sesión

  if (!id_usuario) {
    return res.status(401).json({ error: 'No autorizado, no hay sesión válida' });
  }

  obtenercalificaciones3G(id_usuario, (err, calificaciones) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    res.json(calificaciones);
  });
};

module.exports = { obtenercalificaciones3JSON1, obtenercalificaciones3JSON2, obtenercalificaciones3JSON3, obtenercalificaciones3JSON4,
    obtenercalificaciones3JSON5, obtenercalificaciones3JSON6, obtenercalificaciones3JSON7, obtenercalificaciones3JSON8,
    obtenercalificaciones3JSON9, obtenercalificaciones3JSON10, obtenercalificaciones3JSONFF, obtenercalificaciones3JSONG
 };
