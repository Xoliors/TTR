// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSON, obtenerCalificacionesJSONED, obtenerCalificacionesJSONM, obtenerCalificacionesJSONTN,
    obtenerCalificacionesJSONCM, obtenerCalificacionesJSONEN
 } = require('../controllers/calificaciones');

router.get('/calificaciones_primero/EMA', obtenerCalificacionesJSON);
router.get('/calificaciones_primero/ED', obtenerCalificacionesJSONED);
router.get('/calificaciones_primero/M', obtenerCalificacionesJSONM);
router.get('/calificaciones_primero/CM', obtenerCalificacionesJSONCM);
router.get('/calificaciones_primero/TN', obtenerCalificacionesJSONTN);
router.get('/calificaciones_primero/EN', obtenerCalificacionesJSONEN);

module.exports = router;
