// router/primero.js
const express = require('express');
const router = express.Router();
const ema = require('../controllers/Ejercicios_primero')

///////////////////// ejercicios números /////////////////////////////
router.post('/ema/guardar-calificacion', ema.guardarCalificacion1)
router.post('/emd/guardar-calificacion', ema.guardarCalificacion2)
router.post('/mercado/guardar-calificacion', ema.guardarCalificacion3)
router.post('/caja/guardar-calificacion', ema.guardarCalificacion4)
router.post('/tren/guardar-calificacion', ema.guardarCalificacion5)
router.post('/en/guardar-calificacion', ema.guardarCalificacion6)

module.exports = router;