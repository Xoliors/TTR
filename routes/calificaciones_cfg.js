// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificacionesCCyFGJSON, obtenerCalificacionesjFigurasJSON, obtenerCalificacionesCobjetosJSON, obtenerCalificacionesmemoramaJSON
 } = require('../controllers/calificaciones_cfg');

 const { obtenercalificaciones2CCyFGJSON, obtenercalificaciones2jFigurasJSON, obtenercalificaciones2CobjetosJSON, obtenercalificaciones2memoramaJSON
 } = require('../controllers/calificaciones_cfg_2');

  const { obtenercalificaciones3CCyFGJSON, obtenercalificaciones3jFigurasJSON, obtenercalificaciones3CobjetosJSON, obtenercalificaciones3memoramaJSON
 } = require('../controllers/calificaciones_cfg_3');

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
             res.render("pages/course_cfg", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/course_cfg2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_cfg3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_primero/CCyFG', obtenerCalificacionesCCyFGJSON);
router.get('/calificaciones_primero/jFiguras', obtenerCalificacionesjFigurasJSON);
router.get('/calificaciones_primero/Cobjetos', obtenerCalificacionesCobjetosJSON);
router.get('/calificaciones_primero/memorama', obtenerCalificacionesmemoramaJSON);

router.get('/calificaciones_segundo/CCyFG', obtenercalificaciones2CCyFGJSON);
router.get('/calificaciones_segundo/jFiguras', obtenercalificaciones2jFigurasJSON);
router.get('/calificaciones_segundo/Cobjetos', obtenercalificaciones2CobjetosJSON);
router.get('/calificaciones_segundo/memorama', obtenercalificaciones2memoramaJSON);

router.get('/calificaciones_tercero/CCyFG', obtenercalificaciones3CCyFGJSON);
router.get('/calificaciones_tercero/jFiguras', obtenercalificaciones3jFigurasJSON);
router.get('/calificaciones_tercero/Cobjetos', obtenercalificaciones3CobjetosJSON);
router.get('/calificaciones_tercero/memorama', obtenercalificaciones3memoramaJSON);

module.exports = router;
