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

// 1ero de Primaria (sin :username y con validación de sesión + grado + foto_perfil)
router.get('/ejercicios_numeros', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_numeros');
});

router.get('/ejercicios_suma_resta', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_suma_resta');
});

router.get('/ejercicios_figuras', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_figuras');
});

router.get('/ejercicios_mcl', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_mcl');
});

router.get('/ejercicios_tiempo', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_tiempo');
});

router.get('/ejercicios_datos', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios_datos');
});

module.exports = router;
