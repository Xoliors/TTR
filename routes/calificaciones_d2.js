// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSONCI, obtenerCalificacionesJSONCA, obtenerCalificacionesJSONRF
 } = require('../controllers/calificaciones_d_2');

 const { obtenerCalificaciones3JSONCI, obtenerCalificaciones3JSONCA, obtenerCalificaciones3JSONRF
 } = require('../controllers/calificaciones_d_3');

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

router.get('/calificaciones_segundo/insectos', obtenerCalificacionesJSONCI);
router.get('/calificaciones_segundo/animales', obtenerCalificacionesJSONCA);
router.get('/calificaciones_segundo/frutas', obtenerCalificacionesJSONRF);

router.get('/calificaciones_tercero/insectos', obtenerCalificaciones3JSONCI);
router.get('/calificaciones_tercero/animales', obtenerCalificaciones3JSONCA);
router.get('/calificaciones_tercero/frutas', obtenerCalificaciones3JSONRF);

module.exports = router;
