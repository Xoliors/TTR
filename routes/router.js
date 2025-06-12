//imports
const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/login')
const Usession = require("../models/login")
const upload = require('../middlewares/cargar_archivos');
const registro = require('../controllers/registro')

const primeroRouter = require('./primero');
const segundoRouter = require('./segundo');
const terceroRouter = require('./tercero');

const temas = require('./temas');

const reports = require('./report');

const ejercicios1Router = require('./ejercicios_primer')
const ejercicios_numeros = require('./ejercicios_numeros')
const ejercicios2Router = require('./ejercicios_segundo')
const ejercicios_segundo = require('./ejercicios_route_segundo')
const ejercicios3Router = require('./ejercicios_tercero')
const ejercicios_tercero = require('./ejercicios_route_tercero')

const calificaciones = require('./calificaciones')
const calificacionessr = require('./calificaciones_sr')
const calificacionescfg = require('./calificaciones_cfg')
const calificacioneslmc = require('./calificaciones_lmc')
const calificacionest = require('./calificaciones_t')
const calificacionesd = require('./calificaciones_d')
const calificacionesT = require('./calificaciones_Tablas')
const calificacionesd2 = require('./calificaciones_d2')

const insignias = require('./insignias')

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

router.use('/', temas);

router.use('/', primeroRouter);
router.use('/', segundoRouter);
router.use('/', terceroRouter)
router.use('/', ejercicios1Router);
router.use('/ejercicios_numeros', ejercicios_numeros);
router.use('/', ejercicios2Router);
router.use('/ejercicios_segundo', ejercicios_segundo);
router.use('/', ejercicios3Router);
router.use('/ejercicios_tercero', ejercicios_tercero);


router.use('/calificaciones', calificaciones);
router.use('/calificacionessr', calificacionessr);
router.use('/calificacionescfg', calificacionescfg);
router.use('/calificacioneslmc', calificacioneslmc);
router.use('/calificacionest', calificacionest);
router.use('/calificacionesd', calificacionesd);

router.use('/calificacionesd2', calificacionesd2)
router.use('/calificaciones_mul_div', calificacionesT)

router.use('/insignias', insignias)

router.use('/', reports)

//Métodos


// routes/router.js
const reportes = require('./reportes');
const reportes2 = require('./reportes2');
const reportes3 = require('./reportes3');

router.use('/reportes', reportes);
router.use('/reportes2', reportes2);
router.use('/reportes3', reportes3);


router.post('/auth', usuarios.LoginUsuarios)
router.get('/logout', Usession.LogOutUsuarios)
router.get('/validar', Usession.validarSesion)

router.post('/registro', upload.single('profilePic'), registro.RegistrarU);

module.exports = router;
