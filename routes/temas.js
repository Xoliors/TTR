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

router.get('/tema1', verificarSesion, (req, res) => {
    res.render('pages/tema1');
});

router.get('/tema2', verificarSesion, (req, res) => {
    res.render('pages/tema2');
});

router.get('/tema3', verificarSesion, (req, res) => {
    res.render('pages/tema3');
});

router.get('/tema4', verificarSesion, (req, res) => {
    res.render('pages/tema4');
});

router.get('/tema5', verificarSesion, (req, res) => {
    res.render('pages/tema5');
});

router.get('/tema6', verificarSesion, (req, res) => {
    res.render('pages/tema6');
});

router.get('/tema7', verificarSesion, (req, res) => {
    res.render('pages/tema7');
});

router.get('/tema8', verificarSesion, (req, res) => {
    res.render('pages/tema8');
});

router.get('/tema9', verificarSesion, (req, res) => {
    res.render('pages/tema9');
});

router.get('/tema10', verificarSesion, (req, res) => {
    res.render('pages/tema10');
});

router.get('/tema11', verificarSesion, (req, res) => {
    res.render('pages/tema11');
});

router.get('/tema12', verificarSesion, (req, res) => {
    res.render('pages/tema12');
});

router.get('/tema13', verificarSesion, (req, res) => {
    res.render('pages/tema13');
});

router.get('/tema14', verificarSesion, (req, res) => {
    res.render('pages/tema14');
});

router.get('/tema15', verificarSesion, (req, res) => {
    res.render('pages/tema15');
});

router.get('/tema16', verificarSesion, (req, res) => {
    res.render('pages/tema16');
});

router.get('/tema17', verificarSesion, (req, res) => {
    res.render('pages/tema17');
});

router.get('/tema18', verificarSesion, (req, res) => {
    res.render('pages/tema18');
});

router.get('/tema19', verificarSesion, (req, res) => {
    res.render('pages/tema19');
});

router.get('/tema20', verificarSesion, (req, res) => {
    res.render('pages/tema20');
});

router.get('/tema21', verificarSesion, (req, res) => {
    res.render('pages/tema21');
});

router.get('/tema22', verificarSesion, (req, res) => {
    res.render('pages/tema22');
});




module.exports = router;
