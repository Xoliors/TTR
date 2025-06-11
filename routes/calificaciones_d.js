// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSONG, obtenerCalificacionesJSOND, obtenerCalificacionesJSONA
 } = require('../controllers/calificaciones_d');

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
             res.render("pages/course_d", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course_d2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_d3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/granja', obtenerCalificacionesJSONG);
router.get('/calificaciones_primero/deporteynaturaleza', obtenerCalificacionesJSOND);
router.get('/calificaciones_primero/aviones', obtenerCalificacionesJSONA);

module.exports = router;
