// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSON, obtenerCalificacionesJSONED, obtenerCalificacionesJSONM, obtenerCalificacionesJSONTN,
    obtenerCalificacionesJSONCM, obtenerCalificacionesJSONEN
 } = require('../controllers/calificaciones');

 const { obtenercalificaciones2JSON, obtenercalificaciones2JSONED, obtenercalificaciones2JSONM, obtenercalificaciones2JSONTN, obtenercalificaciones2JSONCM, obtenercalificaciones2JSONEN
 } = require('../controllers/calificaciones2');

  const { obtenercalificaciones3JSON, obtenercalificaciones3JSONED, obtenercalificaciones3JSONM, obtenercalificaciones3JSONTN, obtenercalificaciones3JSONCM, obtenercalificaciones3JSONEN
 } = require('../controllers/calificaciones3');


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

router.get('/calificaciones_primero/EMA', obtenerCalificacionesJSON);
router.get('/calificaciones_primero/ED', obtenerCalificacionesJSONED);
router.get('/calificaciones_primero/M', obtenerCalificacionesJSONM);
router.get('/calificaciones_primero/CM', obtenerCalificacionesJSONCM);
router.get('/calificaciones_primero/TN', obtenerCalificacionesJSONTN);
router.get('/calificaciones_primero/EN', obtenerCalificacionesJSONEN);

router.get('/calificaciones_segundo/EMA', obtenercalificaciones2JSON);
router.get('/calificaciones_segundo/ED', obtenercalificaciones2JSONED);
router.get('/calificaciones_segundo/M', obtenercalificaciones2JSONM);
router.get('/calificaciones_segundo/CM', obtenercalificaciones2JSONCM);
router.get('/calificaciones_segundo/TN', obtenercalificaciones2JSONTN);
router.get('/calificaciones_segundo/EN', obtenercalificaciones2JSONEN);

router.get('/calificaciones_tercero/EMA', obtenercalificaciones3JSON);
router.get('/calificaciones_tercero/ED', obtenercalificaciones3JSONED);
router.get('/calificaciones_tercero/M', obtenercalificaciones3JSONM);
router.get('/calificaciones_tercero/CM', obtenercalificaciones3JSONCM);
router.get('/calificaciones_tercero/TN', obtenercalificaciones3JSONTN);
router.get('/calificaciones_tercero/EN', obtenercalificaciones3JSONEN);

module.exports = router;
