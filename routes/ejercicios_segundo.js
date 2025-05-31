// router/segundo.js
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
router.get('/ejercicios_numeros2/ema2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/ema2');
});

router.get('/ejercicios_numeros2/emd2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/emd2');
});

router.get('/ejercicios_numeros2/mercado2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/mercado2');
});

router.get('/ejercicios_numeros2/caja2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/caja2');
});
router.get('/ejercicios_numeros2/tren2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tren2');
});
router.get('/ejercicios_numeros2/en2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/en2');
});
///////////////////// ejercicios números /////////////////////////////

///////////////////// ejercicios sumas y restas /////////////////////////////

router.get('/ejercicios_suma_resta2/La_tiendita2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/La_tiendita2');
});
router.get('/ejercicios_suma_resta2/sume2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/sume2');
});
router.get('/ejercicios_suma_resta2/conteo2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/conteo2');
});
router.get('/ejercicios_suma_resta2/smv2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/smv2');
});
router.get('/ejercicios_suma_resta2/rv2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/rv2');
});
router.get('/ejercicios_suma_resta2/cartas2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/cartas2');
});
router.get('/ejercicios_suma_resta2/sr2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/sr2');
});

///////////////////// ejercicios sumas y restas /////////////////////////////

///////////////////// ejercicios multiplicación y div /////////////////////////////

router.get('/ejercicios_mul_div2/tabla1', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla1');
});
router.get('/ejercicios_mul_div2/tabla2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla2');
});
router.get('/ejercicios_mul_div2/tabla3', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla3');
});
router.get('/ejercicios_mul_div2/tabla4', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla4');
});
router.get('/ejercicios_mul_div2/tabla5', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla5');
});
router.get('/ejercicios_mul_div2/tabla6', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla6');
});
router.get('/ejercicios_mul_div2/tabla7', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla7');
});
router.get('/ejercicios_mul_div2/tabla8', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla8');
});
router.get('/ejercicios_mul_div2/tabla9', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla9');
});
router.get('/ejercicios_mul_div2/tabla10', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tabla10');
});
router.get('/ejercicios_mul_div2/frutas', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/frutas');
});
router.get('/ejercicios_mul_div2/globos', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/globos');
});
///////////////////// ejercicios multiplicación y div /////////////////////////////

///////////////////// ejercicios figuras /////////////////////////////

router.get('/ejercicios_figuras2/def', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/def');
});
router.get('/ejercicios_figuras2/figuras', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/figuras');
});
router.get('/ejercicios_figuras2/lados', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/lados');
});
router.get('/ejercicios_figuras2/tangram', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/tangram');
});

///////////////////// ejercicios figuras /////////////////////////////

///////////////////// ejercicios mcl /////////////////////////////
router.get('/ejercicios_mcl2/botellas', verificarSesion, (req, res) => {
     res.render('pages/segundo/ejercicios/botellas');
});
router.get('/ejercicios_mcl2/bascula', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/bascula');
});
router.get('/ejercicios_mcl2/barras', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/barras');
});

///////////////////// ejercicios mcl /////////////////////////////

///////////////////// ejercicios tiempo /////////////////////////////

router.get('/ejercicios_tiempo2/historia', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/historia');
});
router.get('/ejercicios_tiempo2/ct2', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/ct2');
});
router.get('/ejercicios_tiempo2/calendario', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/calendario');
});

///////////////////// ejercicios tiempo /////////////////////////////

///////////////////// ejercicios datos /////////////////////////////
router.get('/ejercicios_datos2/insectos', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/insectos');
});
router.get('/ejercicios_datos2/animales', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/animales');
});
router.get('/ejercicios_datos2/divisiones', verificarSesion, (req, res) => {
    res.render('pages/segundo/ejercicios/divisiones');
});

///////////////////// ejercicios datos /////////////////////////////


module.exports = router;
