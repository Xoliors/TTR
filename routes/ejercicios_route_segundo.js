// router/primero.js
const express = require('express');
const router = express.Router();
const ejercicios = require('../controllers/Ejercicios_segundo_gral')
const sr = require('../controllers/Ejercicios_segundo_sr')
const md = require('../controllers/Ejercicios_segundo_md')
const cfg = require('../controllers/Ejercicios_segundo_cfg')
const mcl = require('../controllers/Ejercicios_segundo_mcl')
const tiempo = require('../controllers/Ejercicios_segundo_tiempo')
const datos = require('../controllers/Ejercicios_segundo_datos')

///////////////////// ejercicios números /////////////////////////////
router.post('/ema2/guardar-calificacion', ejercicios.guardarCalificacion1);
router.post('/emd2/guardar-calificacion', ejercicios.guardarCalificacion2);
router.post('/mercado2/guardar-calificacion', ejercicios.guardarCalificacion3);
router.post('/caja2/guardar-calificacion', ejercicios.guardarCalificacion4);
router.post('/tren2/guardar-calificacion', ejercicios.guardarCalificacion5);
router.post('/en2/guardar-calificacion', ejercicios.guardarCalificacion6);

router.post('/La_tiendita2/guardar-calificacion', sr.guardarCalificacion1);
router.post('/sume2/guardar-calificacion', sr.guardarCalificacion2);
router.post('/conteo2/guardar-calificacion', sr.guardarCalificacion3);
router.post('/smv2/guardar-calificacion', sr.guardarCalificacion4);
router.post('/rv2/guardar-calificacion', sr.guardarCalificacion5);
router.post('/cartas2/guardar-calificacion', sr.guardarCalificacion6);
router.post('/sr2/guardar-calificacion', sr.guardarCalificacion7);

router.post('/tabla1/guardar-calificacion', md.guardarCalificacion1);
router.post('/tabla2/guardar-calificacion', md.guardarCalificacion2);
router.post('/tabla3/guardar-calificacion', md.guardarCalificacion3);
router.post('/tabla4/guardar-calificacion', md.guardarCalificacion4);
router.post('/tabla5/guardar-calificacion', md.guardarCalificacion5);
router.post('/tabla6/guardar-calificacion', md.guardarCalificacion6);
router.post('/tabla7/guardar-calificacion', md.guardarCalificacion7);
router.post('/tabla8/guardar-calificacion', md.guardarCalificacion8);
router.post('/tabla9/guardar-calificacion', md.guardarCalificacion9);
router.post('/tabla10/guardar-calificacion', md.guardarCalificacion10);
router.post('/frutas/guardar-calificacion', md.guardarCalificacion11);
router.post('/globos/guardar-calificacion', md.guardarCalificacion12);

router.post('/def/guardar-calificacion', cfg.guardarCalificacion1);
router.post('/figuras/guardar-calificacion', cfg.guardarCalificacion2);
router.post('/lados/guardar-calificacion', cfg.guardarCalificacion3);
router.post('/tangram/guardar-calificacion', cfg.guardarCalificacion4);

router.post('/botellas/guardar-calificacion', mcl.guardarCalificacion1);
router.post('/bascula/guardar-calificacion', mcl.guardarCalificacion2);
router.post('/barras/guardar-calificacion', mcl.guardarCalificacion3);

router.post('/historia/guardar-calificacion', tiempo.guardarCalificacion1);
router.post('/ct2/guardar-calificacion', tiempo.guardarCalificacion2);
router.post('/calendario/guardar-calificacion', tiempo.guardarCalificacion3);

router.post('/insectos/guardar-calificacion', datos.guardarCalificacion1);
router.post('/animales/guardar-calificacion', datos.guardarCalificacion2);
router.post('/divisiones/guardar-calificacion', datos.guardarCalificacion3);

module.exports = router;