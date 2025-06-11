// router/tercero.js
const express = require('express');
const router = express.Router();
const {mostrarInsignias1, mostrarInsignias2, mostrarInsignias3, 
    mostrarInsigniasPorPromedios, mostrarInsigniasPorPromedios2, mostrarInsigniasPorPromedios3} = require('../controllers/insignias')


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
             res.render("pages/insignias1", { username, grado, foto_perfil });
             break;
         case 2:
             res.render("pages/insignias2", { username, grado, foto_perfil });
             break;
         case 3:
             res.render("pages/insignias3", { username, grado, foto_perfil });
             break;
         default:
             res.redirect("/");
     }
 });

router.get('/insignias1', mostrarInsignias1); 
router.get('/insignias2', mostrarInsignias2);
router.get('/insignias2', mostrarInsignias3);

router.get('/insignias-promedio', mostrarInsigniasPorPromedios);
router.get('/insignias-promedio2', mostrarInsigniasPorPromedios2);
router.get('/insignias-promedio3', mostrarInsigniasPorPromedios3);




module.exports = router;