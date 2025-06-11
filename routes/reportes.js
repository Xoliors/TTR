const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte');

 router.get("/", (req, res) => {
     const grado = req.session.grado_id;
     const username = req.session.usuario;
     const foto_perfil = req.session.foto_perfil;
 
     console.log(foto_perfil)
 
     if (!grado || !username) {
         return res.redirect('/');
     }
 
     switch (grado) {
         case 1:
             res.render("pages/dashboard_p", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/dashboard_s", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/dashboard_t", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/promedios-ejercicio', reporteController.promedioPorEjercicio);
router.get('/calificaciones-fecha', reporteController.calificacionesPorFecha);
router.get('/rendimiento', reporteController.rendimientoPorEjercicio);
router.get('/intentos', reporteController.intentosPorEjercicio);

module.exports = router;