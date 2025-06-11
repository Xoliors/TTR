// archivo: routes/calificaciones.js
const express = require('express');
const router = express.Router();
const { obtenerCalificaciones2JSON1, obtenerCalificaciones2JSON2, obtenerCalificaciones2JSON3, obtenerCalificaciones2JSON4,
    obtenerCalificaciones2JSON5, obtenerCalificaciones2JSON6, obtenerCalificaciones2JSON7, obtenerCalificaciones2JSON8,
    obtenerCalificaciones2JSON9, obtenerCalificaciones2JSON10, obtenerCalificaciones2JSONFF, obtenerCalificaciones2JSONG
 } = require('../controllers/calificaciones_tablas')

const { obtenercalificaciones3JSON1, obtenercalificaciones3JSON2, obtenercalificaciones3JSON3, obtenercalificaciones3JSON4,
    obtenercalificaciones3JSON5, obtenercalificaciones3JSON6, obtenercalificaciones3JSON7, obtenercalificaciones3JSON8,
    obtenercalificaciones3JSON9, obtenercalificaciones3JSON10, obtenercalificaciones3JSONFF, obtenercalificaciones3JSONG 
 } = require('../controllers/calificaciones_tablas3')


 router.get("/", (req, res) => {
     const grado = req.session.grado_id;
     const username = req.session.usuario;
     const foto_perfil = req.session.foto_perfil;
 
     console.log(foto_perfil)
 
     if (!grado || !username) {
         return res.redirect('/');
     }
 
    switch (grado) {
         case 2:
             res.render("pages/course_tablas", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/course_tablas3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/calificaciones_segundo/1', obtenerCalificaciones2JSON1);
router.get('/calificaciones_segundo/2', obtenerCalificaciones2JSON2);
router.get('/calificaciones_segundo/3', obtenerCalificaciones2JSON3);
router.get('/calificaciones_segundo/4', obtenerCalificaciones2JSON4);
router.get('/calificaciones_segundo/5', obtenerCalificaciones2JSON5);
router.get('/calificaciones_segundo/6', obtenerCalificaciones2JSON6);
router.get('/calificaciones_segundo/7', obtenerCalificaciones2JSON7);
router.get('/calificaciones_segundo/8', obtenerCalificaciones2JSON8);
router.get('/calificaciones_segundo/9', obtenerCalificaciones2JSON9);
router.get('/calificaciones_segundo/10', obtenerCalificaciones2JSON10);
router.get('/calificaciones_segundo/FF', obtenerCalificaciones2JSONFF);
router.get('/calificaciones_segundo/G', obtenerCalificaciones2JSONG);

router.get('/calificaciones_tercero/1', obtenercalificaciones3JSON1);
router.get('/calificaciones_tercero/2', obtenercalificaciones3JSON2);
router.get('/calificaciones_tercero/3', obtenercalificaciones3JSON3);
router.get('/calificaciones_tercero/4', obtenercalificaciones3JSON4);
router.get('/calificaciones_tercero/5', obtenercalificaciones3JSON5);
router.get('/calificaciones_tercero/6', obtenercalificaciones3JSON6);
router.get('/calificaciones_tercero/7', obtenercalificaciones3JSON7);
router.get('/calificaciones_tercero/8', obtenercalificaciones3JSON8);
router.get('/calificaciones_tercero/9', obtenercalificaciones3JSON9);
router.get('/calificaciones_tercero/10', obtenercalificaciones3JSON10);
router.get('/calificaciones_tercero/FF', obtenercalificaciones3JSONFF);
router.get('/calificaciones_tercero/G', obtenercalificaciones3JSONG);

module.exports = router;