// router/primero.js
const express = require('express');
const router = express.Router();
const ema = require('../controllers/Ejercicios_primero')
const sr = require('../controllers/Ejercicios_primero_sr')
const cfg = require('../controllers/Ejercicios_primero_cfg')
const mcl = require('../controllers/Ejercicios_primero_lmc')
const tiempo = require('../controllers/Ejercicios_primero_mt')

///////////////////// ejercicios números /////////////////////////////
router.post('/ema/guardar-calificacion', ema.guardarCalificacion1)
router.post('/emd/guardar-calificacion', ema.guardarCalificacion2)
router.post('/mercado/guardar-calificacion', ema.guardarCalificacion3)
router.post('/caja/guardar-calificacion', ema.guardarCalificacion4)
router.post('/tren/guardar-calificacion', ema.guardarCalificacion5)
router.post('/en/guardar-calificacion', ema.guardarCalificacion6)

router.post('/tiendita/guardar-calificacion', sr.guardarCalificacion1)
router.post('/picnic/guardar-calificacion', sr.guardarCalificacion2)
router.post('/conteo/guardar-calificacion', sr.guardarCalificacion3)
router.post('/detective/guardar-calificacion', sr.guardarCalificacion4)
router.post('/fiesta/guardar-calificacion', sr.guardarCalificacion5)
router.post('/ladron/guardar-calificacion', sr.guardarCalificacion6)
router.post('/syr/guardar-calificacion', sr.guardarCalificacion7)

router.post('/cuerpos/guardar-calificacion', cfg.guardarCalificacion1)
router.post('/jfiguras/guardar-calificacion', cfg.guardarCalificacion2)
router.post('/clo/guardar-calificacion', cfg.guardarCalificacion3)
router.post('/memorama/guardar-calificacion', cfg.guardarCalificacion4)

router.post('/botellas/guardar-calificacion', mcl.guardarCalificacion1)
router.post('/balanza/guardar-calificacion', mcl.guardarCalificacion2)
router.post('/co/guardar-calificacion', mcl.guardarCalificacion3)

router.post('/itinerario/guardar-calificacion', tiempo.guardarCalificacion1)
router.post('/ctiempo/guardar-calificacion', tiempo.guardarCalificacion2)
router.post('/dia/guardar-calificacion', tiempo.guardarCalificacion3)

router.post('/granja/guardar-calificacion', tiempo.guardarCalificacion1)
router.post('/deporte/guardar-calificacion', tiempo.guardarCalificacion2)
router.post('/avion/guardar-calificacion', tiempo.guardarCalificacion3)
module.exports = router;