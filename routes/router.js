//imports
const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/login')
const Usession = require("../models/login")
const upload = require('../middlewares/cargar_archivos');
const registro = require('../controllers/registro')

const primeroRouter = require('./primero');
const segundoRouter = require('./segundo');
const ejercicios1Router = require('./ejercicios_primer')
const ejercicios_numeros = require('./ejercicios_numeros')

const session = require('express-session');

router.use(session({
    secret: '6FSRSDATEMRGYEAJLPCAWTUVL4SBHCPD', // usa una clave secreta fuerte en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // pon `true` si usas HTTPS
  }));

// Rutas
router.get("/", (req, res) => {
    res.render("pages/index"); // Renderiza la vista 'index.ejs'
});

router.get("/about", (req, res) => {
    res.render("pages/about"); // Renderiza la vista 'about.ejs'
});

router.get("/calificaciones", (req, res) => {
    const grado = req.session.grado_id;
    const username = req.session.usuario;
    const foto_perfil = req.session.foto_perfil;

    console.log(foto_perfil)

    if (!grado || !username) {
        return res.redirect('/');
    }

    switch (grado) {
        case 1:
            res.render("pages/course", { username, grado, foto_perfil });
            break;
        case 2:
            res.render("pages/course2", { username, grado, foto_perfil });
            break;
        case 3:
            res.render("pages/course3", { username, grado, foto_perfil });
            break;
        default:
            res.redirect("/");
    }
});

router.get("/register", (req, res) => {
    res.render("pages/register"); // Renderiza la vista 'teachers.ejs'
});
router.get("/blog", (req, res) => {
    res.render("pages/blog"); // Renderiza la vista 'blog.ejs'
});
router.get("/single", (req, res) => {
    res.render("pages/single"); // Renderiza la vista 'single.ejs'
});
router.get("/contact", (req, res) => {
    res.render("pages/contact"); // Renderiza la vista 'contact.ejs'
});
router.get("/login", (req, res) => {
    res.render("pages/login"); // Renderiza la vista 'contact.ejs'
});

router.get("/home", (req, res) => {
    const grado = req.session.grado_id;
    const username = req.session.usuario;
    const foto_perfil = req.session.foto_perfil;

    console.log(foto_perfil)

    if (!grado || !username) {
        return res.redirect('/');
    }

    switch (grado) {
        case 1:
            res.render("pages/usuario1", { username, grado, foto_perfil });
            break;
        case 2:
            res.render("pages/usuario2", { username, grado, foto_perfil });
            break;
        case 3:
            res.render("pages/usuario3", { username, grado, foto_perfil });
            break;
        default:
            res.redirect("/");
    }
});

router.use('/', primeroRouter);
router.use('/', segundoRouter);
router.use('/', ejercicios1Router);
router.use('/ejercicios_numeros', ejercicios_numeros);


//2do de Primaria
router.get('/ejercicios_numeros2/:username/ema2', (req, res) => {
    const username = req.params.username;
    res.render('ema2', { username });
});
router.get('/ejercicios_numeros2/:username/emd2', (req, res) => {
    const username = req.params.username;
    res.render('emd2', { username });
});
router.get('/ejercicios_numeros2/:username/mercado2', (req, res) => {
    const username = req.params.username;
    res.render('mercado2', { username });
});
router.get('/ejercicios_numeros2/:username/caja2', (req, res) => {
    const username = req.params.username;
    res.render('caja2', { username });
});
router.get('/ejercicios_numeros2/:username/tren2', (req, res) => {
    const username = req.params.username;
    res.render('tren2', { username });
});
router.get('/ejercicios_numeros2/:username/en2', (req, res) => {
    const username = req.params.username;
    res.render('en2', { username });
});
router.get('/ejercicios_suma_resta2/:username/La_tiendita2', (req, res) => {
    const username = req.params.username;
    res.render('La_tiendita2', { username });
});
router.get('/ejercicios_suma_resta2/:username/sume2', (req, res) => {
    const username = req.params.username;
    res.render('sume2', { username });
});
router.get('/ejercicios_suma_resta2/:username/conteo2', (req, res) => {
    const username = req.params.username;
    res.render('conteo2', { username });
});
router.get('/ejercicios_suma_resta2/:username/smv2', (req, res) => {
    const username = req.params.username;
    res.render('smv2', { username });
});
router.get('/ejercicios_suma_resta2/:username/rv2', (req, res) => {
    const username = req.params.username;
    res.render('rv2', { username });
});
router.get('/ejercicios_suma_resta2/:username/cartas2', (req, res) => {
    const username = req.params.username;
    res.render('cartas2', { username });
});
router.get('/ejercicios_suma_resta2/:username/sr2', (req, res) => {
    const username = req.params.username;
    res.render('sr2', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla1', (req, res) => {
    const username = req.params.username;
    res.render('tabla1', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla2', (req, res) => {
    const username = req.params.username;
    res.render('tabla2', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla3', (req, res) => {
    const username = req.params.username;
    res.render('tabla3', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla4', (req, res) => {
    const username = req.params.username;
    res.render('tabla4', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla5', (req, res) => {
    const username = req.params.username;
    res.render('tabla5', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla6', (req, res) => {
    const username = req.params.username;
    res.render('tabla6', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla7', (req, res) => {
    const username = req.params.username;
    res.render('tabla7', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla8', (req, res) => {
    const username = req.params.username;
    res.render('tabla8', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla9', (req, res) => {
    const username = req.params.username;
    res.render('tabla9', { username });
});
router.get('/ejercicios_mul_div2/:username/tabla10', (req, res) => {
    const username = req.params.username;
    res.render('tabla10', { username });
});
router.get('/ejercicios_mul_div2/:username/frutas', (req, res) => {
    const username = req.params.username;
    res.render('frutas', { username });
});
router.get('/ejercicios_mul_div2/:username/globos', (req, res) => {
    const username = req.params.username;
    res.render('globos', { username });
});
router.get('/ejercicios_figuras2/:username/def', (req, res) => {
    const username = req.params.username;
    res.render('def', { username });
});
router.get('/ejercicios_figuras2/:username/figuras', (req, res) => {
    const username = req.params.username;
    res.render('figuras', { username });
});
router.get('/ejercicios_figuras2/:username/lados', (req, res) => {
    const username = req.params.username;
    res.render('lados', { username });
});
router.get('/ejercicios_figuras2/:username/tangram', (req, res) => {
    const username = req.params.username;
    res.render('tangram', { username });
});
router.get('/ejercicios_mcl2/:username/botellas', (req, res) => {
    const username = req.params.username;
    res.render('botellas', { username });
});
router.get('/ejercicios_mcl2/:username/bascula', (req, res) => {
    const username = req.params.username;
    res.render('bascula', { username });
});
router.get('/ejercicios_mcl2/:username/barras', (req, res) => {
    const username = req.params.username;
    res.render('barras', { username });
});
router.get('/ejercicios_tiempo2/:username/historia', (req, res) => {
    const username = req.params.username;
    res.render('historia', { username });
});
router.get('/ejercicios_tiempo2/:username/ct2', (req, res) => {
    const username = req.params.username;
    res.render('ct2', { username });
});
router.get('/ejercicios_tiempo2/:username/calendario', (req, res) => {
    const username = req.params.username;
    res.render('calendario', { username });
});
router.get('/ejercicios_datos2/:username/insectos', (req, res) => {
    const username = req.params.username;
    res.render('insectos', { username });
});
router.get('/ejercicios_datos2/:username/animales', (req, res) => {
    const username = req.params.username;
    res.render('animales', { username });
});
router.get('/ejercicios_datos2/:username/divisiones', (req, res) => {
    const username = req.params.username;
    res.render('divisiones', { username });
});


//Métodos

router.post('/auth', usuarios.LoginUsuarios)
router.get('/logout', Usession.LogOutUsuarios)
router.get('/validar', Usession.validarSesion)

router.post('/registro', upload.single('profilePic'), registro.RegistrarU);

module.exports = router;
