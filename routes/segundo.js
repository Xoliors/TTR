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

// 2dode Primaria (sin :username y con validación de sesión + grado + foto_perfil)
router.get('/ejercicios_numeros2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_numeros2');
});
router.get('/ejercicios_suma_resta2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_suma_resta2');
});
router.get('/ejercicios_mul_div2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_mul_div2');
});
router.get('/ejercicios_figuras2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_figuras2');
});
router.get('/ejercicios_mcl2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_mcl2');
});
router.get('/ejercicios_tiempo2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_tiempo2');
});
router.get('/ejercicios_datos2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios_datos2');
});

module.exports = router;