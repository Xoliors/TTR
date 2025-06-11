const Reporte = require('../models/reporte');

module.exports = {
  promedioPorEjercicio(req, res) {
    const id_usuario = req.session.id_usuario; // <-- aquí usas id_usuario como en sesión
    Reporte.obtenerPromediosPorEjercicio(id_usuario, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error obteniendo promedios' });
      res.json(data);
    });
  },

  calificacionesPorFecha(req, res) {
    const id_usuario = req.session.id_usuario;
    Reporte.obtenerCalificacionesPorFecha(id_usuario, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error obteniendo promedios' });
      res.json(data);
    });
  },

  rendimientoPorEjercicio(req, res) {
    const id_usuario = req.session.id_usuario;
    Reporte.obtenerRendimientoPorEjercicio(id_usuario, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error obteniendo promedios' });
      res.json(data);
    });
  },

  intentosPorEjercicio(req, res) {
    const id_usuario = req.session.id_usuario;
    Reporte.obtenerIntentosPorEjercicio(id_usuario, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error obteniendo promedios' });
      res.json(data);
    });
  }
};