// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSON, obtenerCalificacionesJSONED, obtenerCalificacionesJSONM, obtenerCalificacionesJSONTN,
    obtenerCalificacionesJSONCM, obtenerCalificacionesJSONEN
 } = require('../controllers/calificaciones');

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
             res.render("pages/course", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/CCyFG', obtenerCalificacionesJSON);
router.get('/calificaciones_primero/jFiguras', obtenerCalificacionesJSONED);
router.get('/calificaciones_primero/Cobjetos', obtenerCalificacionesJSONM);
router.get('/calificaciones_primero/memorama', obtenerCalificacionesJSONCM);

module.exports = router;
