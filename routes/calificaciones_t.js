// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSONI, obtenerCalificacionesJSONCT, obtenerCalificacionesJSOND } = require('../controllers/calificaciones_t');
const { obtenerCalificaciones2JSONH, obtenerCalificaciones2JSONCT, obtenerCalificaciones2JSONCL } = require('../controllers/calificaciones_t2')
const { obtenercalificaciones3JSONH, obtenercalificaciones3JSONCT, obtenercalificaciones3JSONCL } = require('../controllers/calificaciones_t3')


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
             res.render("pages/course_t", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course_t2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_t3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/itienrario', obtenerCalificacionesJSONI);
router.get('/calificaciones_primero/Ctiempo', obtenerCalificacionesJSONCT);
router.get('/calificaciones_primero/dia', obtenerCalificacionesJSOND);

router.get('/calificaciones_segundo/H', obtenerCalificaciones2JSONH);
router.get('/calificaciones_segundo/Ctiempo', obtenerCalificaciones2JSONCT);
router.get('/calificaciones_segundo/calendario', obtenerCalificaciones2JSONCL);

router.get('/calificaciones_tercero/H', obtenercalificaciones3JSONH);
router.get('/calificaciones_tercero/Ctiempo', obtenercalificaciones3JSONCT);
router.get('/calificaciones_tercero/calendario', obtenercalificaciones3JSONCL);

module.exports = router;
