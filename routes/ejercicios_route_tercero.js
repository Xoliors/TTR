// router/primero.js
const express = require('express');
const router = express.Router();
const ejercicios = require('../controllers/Ejercicios_tercero_num')
const sr = require('../controllers/Ejercicios_tercero_sr')
const md = require('../controllers/Ejercicios_tercero_md')
const cfg = require('../controllers/Ejercicios_tercero_cfg')
const mcl = require('../controllers/Ejercicios_tercero_mcl')
const tiempo = require('../controllers/Ejercicios_tercero_tiempo')
const datos = require('../controllers/Ejercicios_tercero_datos')

///////////////////// ejercicios números /////////////////////////////
router.post('/ema3/guardar-calificacion', ejercicios.guardarCalificacion1);
router.post('/emd3/guardar-calificacion', ejercicios.guardarCalificacion2);
router.post('/mercado3/guardar-calificacion', ejercicios.guardarCalificacion3);
router.post('/caja3/guardar-calificacion', ejercicios.guardarCalificacion4);
router.post('/tren3/guardar-calificacion', ejercicios.guardarCalificacion5);
router.post('/en3/guardar-calificacion', ejercicios.guardarCalificacion6);

router.post('/La_tiendita3/guardar-calificacion', sr.guardarCalificacion1);
router.post('/sume3/guardar-calificacion', sr.guardarCalificacion2);
router.post('/conteo3/guardar-calificacion', sr.guardarCalificacion3);
router.post('/smv3/guardar-calificacion', sr.guardarCalificacion4);
router.post('/rv3/guardar-calificacion', sr.guardarCalificacion5);
router.post('/cartas3/guardar-calificacion', sr.guardarCalificacion6);
router.post('/sr3/guardar-calificacion', sr.guardarCalificacion7);

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
router.post('/fim/guardar-calificacion', md.guardarCalificacion11);
router.post('/divisiones3/guardar-calificacion', md.guardarCalificacion12);

router.post('/def3/guardar-calificacion', cfg.guardarCalificacion1);
router.post('/triangulos/guardar-calificacion', cfg.guardarCalificacion2);
router.post('/lados3/guardar-calificacion', cfg.guardarCalificacion3);
router.post('/memorama3/guardar-calificacion', cfg.guardarCalificacion4);

router.post('/tinacos/guardar-calificacion', mcl.guardarCalificacion1);
router.post('/fracciones/guardar-calificacion', mcl.guardarCalificacion2);
router.post('/barras3/guardar-calificacion', mcl.guardarCalificacion3);

router.post('/ct3/guardar-calificacion', tiempo.guardarCalificacion1);
router.post('/reloj/guardar-calificacion', tiempo.guardarCalificacion2);
router.post('/midia3/guardar-calificacion', tiempo.guardarCalificacion3);

router.post('/insectos3/guardar-calificacion', datos.guardarCalificacion1);
router.post('/animales3/guardar-calificacion', datos.guardarCalificacion2);
router.post('/jardin/guardar-calificacion', datos.guardarCalificacion3);

module.exports = router;