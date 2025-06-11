// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesJSON, obtenerCalificacionesJSONED, obtenerCalificacionesJSONM, obtenerCalificacionesJSONTN,
    obtenerCalificacionesJSONCM, obtenerCalificacionesJSONEN, obtenerCalificacionesJSONSyR
 } = require('../controllers/calificaciones_sr');

 const { obtenerCalificaciones2JSONT, obtenerCalificaciones2JSONSF, obtenerCalificaciones2JSONC, obtenerCalificaciones2JSONSV,
  obtenerCalificaciones2JSONRV, obtenerCalificaciones2JSONCa, obtenerCalificaciones2JSONSR } = require('../controllers/calificaciones_sr_2')

   const { obtenercalificaciones3JSONT, obtenercalificaciones3JSONSF, obtenercalificaciones3JSONC, obtenercalificaciones3JSONSV,
  obtenercalificaciones3JSONRV, obtenercalificaciones3JSONCa, obtenercalificaciones3JSONSR } = require('../controllers/calificaciones_sr_3')

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
             res.render("pages/course_sr", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course_sr2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_sr3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/tienda', obtenerCalificacionesJSON);
router.get('/calificaciones_primero/picnic', obtenerCalificacionesJSONED);
router.get('/calificaciones_primero/conteo', obtenerCalificacionesJSONM);
router.get('/calificaciones_primero/detective', obtenerCalificacionesJSONCM);
router.get('/calificaciones_primero/fiesta', obtenerCalificacionesJSONTN);
router.get('/calificaciones_primero/ladron', obtenerCalificacionesJSONEN);
router.get('/calificaciones_primero/syr', obtenerCalificacionesJSONSyR);

router.get('/calificaciones_segundo/T', obtenerCalificaciones2JSONT);
router.get('/calificaciones_segundo/SF', obtenerCalificaciones2JSONSF);
router.get('/calificaciones_segundo/C', obtenerCalificaciones2JSONC);
router.get('/calificaciones_segundo/SV', obtenerCalificaciones2JSONSV);
router.get('/calificaciones_segundo/RV', obtenerCalificaciones2JSONRV);
router.get('/calificaciones_segundo/Ca', obtenerCalificaciones2JSONCa);
router.get('/calificaciones_segundo/SR', obtenerCalificaciones2JSONSR);

router.get('/calificaciones_tercero/T', obtenercalificaciones3JSONT);
router.get('/calificaciones_tercero/SF', obtenercalificaciones3JSONSF);
router.get('/calificaciones_tercero/C', obtenercalificaciones3JSONC);
router.get('/calificaciones_tercero/SV', obtenercalificaciones3JSONSV);
router.get('/calificaciones_tercero/RV', obtenercalificaciones3JSONRV);
router.get('/calificaciones_tercero/Ca', obtenercalificaciones3JSONCa);
router.get('/calificaciones_tercero/SR', obtenercalificaciones3JSONSR);

module.exports = router;
