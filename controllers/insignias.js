const insigniasModel = require('../models/insignias');

// Esta función será utilizada en el router como manejador de ruta
const mostrarInsignias1 = (req, res) => {
  insigniasModel.getAllInsignias1((err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias1:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ insignias });
  });
};

const mostrarInsignias2 = (req, res) => {
  insigniasModel.getAllInsignias2((err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias2:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // ✅ Enviar los datos como JSON
    res.json({ insignias });
  });
};


const mostrarInsignias3 = (req, res) => {
  insigniasModel.getAllInsignias3((err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias3:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // ✅ Enviar los datos como JSON
    res.json({ insignias });
  });
};

const promedioPorEjercicio = (req, res) => {
  const id_usuario = req.session.id_usuario; // <-- aquí usas id_usuario como en sesión
  Reporte.obtenerPromediosPorEjercicio(id_usuario, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error obteniendo promedios' });
    res.json(data);
  });
}

const mostrarInsigniasPorPromedios = (req, res) => {
  const id_usuario = req.session.id_usuario;

  insigniasModel.obtenerInsigniasPorPromedios(id_usuario, (err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias por promedio:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ insignias });
  });
};


const mostrarInsigniasPorPromedios2 = (req, res) => {
  const id_usuario = req.session.id_usuario;

  insigniasModel.obtenerInsigniasPorPromedios2(id_usuario, (err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias por promedio:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ insignias });
  });
};

const mostrarInsigniasPorPromedios3 = (req, res) => {
  const id_usuario = req.session.id_usuario;

  insigniasModel.obtenerInsigniasPorPromedios3(id_usuario, (err, insignias) => {
    if (err) {
      console.error('Error al obtener insignias por promedio:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ insignias });
  });
};



module.exports = {
  mostrarInsignias1,
  mostrarInsignias2,
  mostrarInsignias3,
  promedioPorEjercicio,
  mostrarInsigniasPorPromedios,
  mostrarInsigniasPorPromedios2,
  mostrarInsigniasPorPromedios3
};
