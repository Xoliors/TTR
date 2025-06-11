// router/primero.js
const express = require('express');
const router = express.Router();

// Middleware para validar sesión
function verificarSesion(req, res, next) {
    const username = req.session.usuario;
    const grado = req.session.grado_id;
    const foto_perfil = req.session.foto_perfil;

    if (!username || !grado) {
        return res.redirect('/');
    }

    // Agregamos los datos validados al objeto `res.locals` para que estén disponibles en todas las vistas
    res.locals.username = username;
    res.locals.grado = grado;
    res.locals.foto_perfil = foto_perfil;

    next();
}

// 3ro de Primaria (sin :username y con validación de sesión + grado + foto_perfil)
router.get('/ejercicios_numeros3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_numeros3');
});
router.get('/ejercicios_suma_resta3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_suma_resta3');
});
router.get('/ejercicios_mul_div3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_mul_div3');
});
router.get('/ejercicios_figuras3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_figuras3');
});
router.get('/ejercicios_mcl3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_mcl3');
});
router.get('/ejercicios_tiempo3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_tiempo3');
});
router.get('/ejercicios_datos3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios_datos3');
});

module.exports = router;