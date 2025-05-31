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
const ejercicios2Router = require('./ejercicios_segundo')
const ejercicios_segundo = require('./ejercicios_route_segundo')

const calificaciones = require('./calificaciones')
const calificacionessr = require('./calificaciones_sr')
const calificacionescfg = require('./calificaciones_cfg')
const calificacioneslmc = require('./calificaciones_lmc')
const calificacionest = require('./calificaciones_t')
const calificacionesd = require('./calificaciones_d')

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

router.use('/', primeroRouter);
router.use('/', segundoRouter);
router.use('/', ejercicios1Router);
router.use('/ejercicios_numeros', ejercicios_numeros);
router.use('/', ejercicios2Router);
router.use('/ejercicios_segundo', ejercicios_segundo)


router.use('/calificaciones', calificaciones);
router.use('/calificacionessr', calificaciones);
router.use('/calificacionescfg', calificaciones);
router.use('/calificacioneslmc', calificaciones);
router.use('/calificacionest', calificaciones);
router.use('/calificacionesd', calificaciones);

//Métodos

router.post('/auth', usuarios.LoginUsuarios)
router.get('/logout', Usession.LogOutUsuarios)
router.get('/validar', Usession.validarSesion)

router.post('/registro', upload.single('profilePic'), registro.RegistrarU);

module.exports = router;
