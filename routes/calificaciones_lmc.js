// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSONLB, obtenerCalificacionesJSONLBA, obtenerCalificacionesJSONCO } = require('../controllers/calificaciones_lmc');
const { obtenerCalificaciones2JSONLB, obtenerCalificaciones2JSONLBA, obtenerCalificaciones2JSONB } = require('../controllers/calificaciones_lmc2');
const { obtenercalificaciones3JSONLB, obtenercalificaciones3JSONLBA, obtenercalificaciones3JSONB} = require('../controllers/calificaciones_lmc3');

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
             res.render("pages/course_lmc", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course_lmc2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_lmc3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/LB', obtenerCalificacionesJSONLB);
router.get('/calificaciones_primero/LBa', obtenerCalificacionesJSONLBA);
router.get('/calificaciones_primero/CO', obtenerCalificacionesJSONCO);

router.get('/calificaciones_segundo/LB', obtenerCalificaciones2JSONLB);
router.get('/calificaciones_segundo/LBa', obtenerCalificaciones2JSONLBA);
router.get('/calificaciones_segundo/B', obtenerCalificaciones2JSONB);

router.get('/calificaciones_tercero/LB', obtenercalificaciones3JSONLB);
router.get('/calificaciones_tercero/LBa', obtenercalificaciones3JSONLBA);
router.get('/calificaciones_tercero/B', obtenercalificaciones3JSONB);


module.exports = router;
