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

//1ero de primaria
///////////////////// ejercicios números /////////////////////////////
router.get('/ejercicios_numeros/ema', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/ema');
});

router.get('/ejercicios_numeros/emd', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/emd');
});

router.get('/ejercicios_numeros/mercado', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/mercado');
});

router.get('/ejercicios_numeros/caja', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/caja');
});
router.get('/ejercicios_numeros/tren', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/tren');
});
router.get('/ejercicios_numeros/en', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/en');
});
///////////////////// ejercicios números /////////////////////////////

///////////////////// ejercicios sumas y restas /////////////////////////////

router.get('/ejercicios_suma_resta/La_tiendita', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/La_tiendita');
});
router.get('/ejercicios_suma_resta/picnic', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/picnic');
});
router.get('/ejercicios_suma_resta/conteo', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/conteo');
});
router.get('/ejercicios_suma_resta/detective', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/detective');
});
router.get('/ejercicios_suma_resta/fiesta', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/fiesta');
});
router.get('/ejercicios_suma_resta/ladron', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/ladron');
});
router.get('/ejercicios_suma_resta/sr', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/sr');
});

///////////////////// ejercicios sumas y restas /////////////////////////////

///////////////////// ejercicios figuras /////////////////////////////

router.get('/ejercicios_figuras/cuerpos', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/cuerpos');
});
router.get('/ejercicios_figuras/jfiguras', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/jfiguras');
});
router.get('/ejercicios_figuras/clo', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/clo');
});
router.get('/ejercicios_figuras/memorama', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/memorama');
});

///////////////////// ejercicios figuras /////////////////////////////

///////////////////// ejercicios mcl /////////////////////////////
router.get('/ejercicios_mcl/botella', verificarSesion, (req, res) => {
     res.render('pages/primero/ejercicios/botella');
});
router.get('/ejercicios_mcl/balanza', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/balanza');
});
router.get('/ejercicios_mcl/co', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/co');
});

///////////////////// ejercicios mcl /////////////////////////////

///////////////////// ejercicios tiempo /////////////////////////////

router.get('/ejercicios_tiempo/itinerario', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/itinerario');
});
router.get('/ejercicios_tiempo/ct', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/ct');
});
router.get('/ejercicios_tiempo/midia', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/midia');
});

///////////////////// ejercicios tiempo /////////////////////////////

///////////////////// ejercicios datos /////////////////////////////
router.get('/ejercicios_datos/granja', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/granja');
});
router.get('/ejercicios_datos/deporte', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/deporte');
});
router.get('/ejercicios_datos/aviones', verificarSesion, (req, res) => {
    res.render('pages/primero/ejercicios/aviones');
});

///////////////////// ejercicios datos /////////////////////////////


module.exports = router;
