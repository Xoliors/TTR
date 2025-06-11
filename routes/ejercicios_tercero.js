// router/tercero.js
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

//2do de primaria
///////////////////// ejercicios números /////////////////////////////
router.get('/ejercicios_numeros3/ema3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/ema3');
});

router.get('/ejercicios_numeros3/emd3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/emd3');
});

router.get('/ejercicios_numeros3/mercado3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/mercado3');
});

router.get('/ejercicios_numeros3/caja3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/caja3');
});
router.get('/ejercicios_numeros3/tren3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tren3');
});
router.get('/ejercicios_numeros3/en3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/en3');
});
///////////////////// ejercicios números /////////////////////////////

///////////////////// ejercicios sumas y restas /////////////////////////////

router.get('/ejercicios_suma_resta3/La_tiendita3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/La_tiendita3');
});
router.get('/ejercicios_suma_resta3/sume3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/sume3');
});
router.get('/ejercicios_suma_resta3/conteo3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/conteo3');
});
router.get('/ejercicios_suma_resta3/smv3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/smv3');
});
router.get('/ejercicios_suma_resta3/rv3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/rv3');
});
router.get('/ejercicios_suma_resta3/cartas3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/cartas3');
});
router.get('/ejercicios_suma_resta3/sr3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/sr3');
});

///////////////////// ejercicios sumas y restas /////////////////////////////

///////////////////// ejercicios multiplicación y div /////////////////////////////

router.get('/ejercicios_mul_div3/tabla10', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla10_1');
});
router.get('/ejercicios_mul_div3/tabla20', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla20');
});
router.get('/ejercicios_mul_div3/tabla30', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla30');
});
router.get('/ejercicios_mul_div3/tabla40', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla40');
});
router.get('/ejercicios_mul_div3/tabla50', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla50');
});
router.get('/ejercicios_mul_div3/tabla60', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla60');
});
router.get('/ejercicios_mul_div3/tabla70', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla70');
});
router.get('/ejercicios_mul_div3/tabla80', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla80');
});
router.get('/ejercicios_mul_div3/tabla90', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla90');
});
router.get('/ejercicios_mul_div3/tabla100', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/tabla100');
});
router.get('/ejercicios_mul_div3/fim', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/fim');
});
router.get('/ejercicios_mul_div3/divisiones', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/divisiones');
});
///////////////////// ejercicios multiplicación y div /////////////////////////////

///////////////////// ejercicios figuras /////////////////////////////

router.get('/ejercicios_figuras3/def3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/def3');
});
router.get('/ejercicios_figuras3/triangulos', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/triangulos');
});
router.get('/ejercicios_figuras3/lados3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/lados3');
});
router.get('/ejercicios_figuras3/memorama3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/memorama3');
});

///////////////////// ejercicios figuras /////////////////////////////

///////////////////// ejercicios mcl /////////////////////////////
router.get('/ejercicios_mcl3/tinacos', verificarSesion, (req, res) => {
     res.render('pages/tercero/ejercicios/tinacos');
});
router.get('/ejercicios_mcl3/fracciones', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/fracciones');
});
router.get('/ejercicios_mcl3/barras3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/barras3');
});

///////////////////// ejercicios mcl /////////////////////////////

///////////////////// ejercicios tiempo /////////////////////////////

router.get('/ejercicios_tiempo3/ct3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/ct3');
});
router.get('/ejercicios_tiempo3/reloj', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/reloj');
});
router.get('/ejercicios_tiempo3/midia3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/midia3');
});

///////////////////// ejercicios tiempo /////////////////////////////

///////////////////// ejercicios datos /////////////////////////////
router.get('/ejercicios_datos3/insectos3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/insectos3');
});
router.get('/ejercicios_datos3/animales3', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/animales3');
});
router.get('/ejercicios_datos3/jardin', verificarSesion, (req, res) => {
    res.render('pages/tercero/ejercicios/jardin');
});

///////////////////// ejercicios datos /////////////////////////////


module.exports = router;
