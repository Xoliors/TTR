//imports
const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/login')
const Usession = require("../models/login")
const upload = require('../middlewares/cargar_archivos');
const registro = require('../controllers/registro')

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

router.get("/course", (req, res) => {
    res.render("pages/course"); // Renderiza la vista 'courses.ejs'
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


//1ero de Primaria
app.get('/usuario1/:username/ejercicios_numeros', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_numeros', { username: username });
});
app.get('/usuario1/:username/ejercicios_suma_resta', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_suma_resta', { username: username });
});
app.get('/usuario1/:username/ejercicios_figuras', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_figuras', { username: username });
});
app.get('/usuario1/:username/ejercicios_mcl', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_mcl', { username: username });
});
app.get('/usuario1/:username/ejercicios_tiempo', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_tiempo', { username: username });
});
app.get('/usuario1/:username/ejercicios_datos', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_datos', { username: username });
});

//2do de Primaria


app.get('/usuario2/:username/ejercicios_numeros2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_numeros2', { username: username });
});
app.get('/usuario2/:username/ejercicios_suma_resta2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_suma_resta2', { username: username });
});
app.get('/usuario2/:username/ejercicios_mul_div2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_mul_div2', { username: username });
});
app.get('/usuario2/:username/ejercicios_figuras2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_figuras2', { username: username });
});
app.get('/usuario2/:username/ejercicios_mcl2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_mcl2', { username: username });
});
app.get('/usuario2/:username/ejercicios_tiempo2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_tiempo2', { username: username });
});
app.get('/usuario2/:username/ejercicios_datos2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios_datos2', { username: username });
});

//1ero de primaria
app.get('/usuario1/:username/ejercicios2', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios2', { username: username });
});
app.get('/usuario1/:username/ejercicios3', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('ejercicios3', { username: username });
});
app.get('/ejercicios1/:username/usuario1', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('usuario', { username: username });
});
app.get('/ejercicios2/:username/usuario1', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('usuario', { username: username });
});

app.get('/ejercicios3/:username/usuario1', (req, res) => {
    const username = req.params.username;  // Obtiene el username de la URL
    // Renderiza la vista 'ejercicios1' pasando el username como parámetro
    res.render('usuario', { username: username });
});
app.get('/ejercicio1/:username/ejercicio1', (req, res) => {
    const username = req.params.username;
    res.render('ejercicio1', { username });
});
app.get('/ejercicio1/:username/ejercicio1', (req, res) => {
    const username = req.params.username;
    res.render('ejercicio1', { username });
});
app.get('/ejercicios_suma_resta/:username/La_tiendita', (req, res) => {
    const username = req.params.username;
    res.render('La_tiendita', { username });
});
app.get('/ejercicios_suma_resta/:username/picnic', (req, res) => {
    const username = req.params.username;
    res.render('picnic', { username });
});
app.get('/ejercicios_suma_resta/:username/conteo', (req, res) => {
    const username = req.params.username;
    res.render('conteo', { username });
});
app.get('/ejercicios_suma_resta/:username/detective', (req, res) => {
    const username = req.params.username;
    res.render('detective', { username });
});
app.get('/ejercicios_suma_resta/:username/fiesta', (req, res) => {
    const username = req.params.username;
    res.render('fiesta', { username });
});
app.get('/ejercicios_suma_resta/:username/ladron', (req, res) => {
    const username = req.params.username;
    res.render('ladron', { username });
});
app.get('/ejercicios_suma_resta/:username/sr', (req, res) => {
    const username = req.params.username;
    res.render('sr', { username });
});
app.get('/ejercicios_figuras/:username/cuerpos', (req, res) => {
    const username = req.params.username;
    res.render('cuerpos', { username });
});
app.get('/ejercicios_figuras/:username/jfiguras', (req, res) => {
    const username = req.params.username;
    res.render('jfiguras', { username });
});
app.get('/ejercicios_figuras/:username/clo', (req, res) => {
    const username = req.params.username;
    res.render('clo', { username });
});
app.get('/ejercicios_figuras/:username/memorama', (req, res) => {
    const username = req.params.username;
    res.render('memorama', { username });
});

app.get('/ejercicios_datos/:username/granja', (req, res) => {
    const username = req.params.username;
    res.render('granja', { username });
});
app.get('/ejercicios_datos/:username/deporte', (req, res) => {
    const username = req.params.username;
    res.render('deporte', { username });
});
app.get('/ejercicios_datos/:username/aviones', (req, res) => {
    const username = req.params.username;
    res.render('aviones', { username });
});

app.get('/ejercicios_tiempo/:username/itinerario', (req, res) => {
    const username = req.params.username;
    res.render('itinerario', { username });
});
app.get('/ejercicios_tiempo/:username/ct', (req, res) => {
    const username = req.params.username;
    res.render('ct', { username });
});
app.get('/ejercicios_tiempo/:username/midia', (req, res) => {
    const username = req.params.username;
    res.render('midia', { username });
});
app.get('/ejercicios_mcl/:username/botella', (req, res) => {
    const username = req.params.username;
    res.render('botella', { username });
});
app.get('/ejercicios_mcl/:username/balanza', (req, res) => {
    const username = req.params.username;
    res.render('balanza', { username });
});
app.get('/ejercicios_mcl/:username/co', (req, res) => {
    const username = req.params.username;
    res.render('co', { username });
});
app.get('/ejercicios_numeros/:username/ema', (req, res) => {
    const username = req.params.username;
    res.render('ema', { username });
});
app.get('/ejercicios_numeros/:username/emd', (req, res) => {
    const username = req.params.username;
    res.render('emd', { username });
});
app.get('/ejercicios_numeros/:username/mercado', (req, res) => {
    const username = req.params.username;
    res.render('mercado', { username });
});
app.get('/ejercicios_numeros/:username/caja', (req, res) => {
    const username = req.params.username;
    res.render('caja', { username });
});
app.get('/ejercicios_numeros/:username/tren', (req, res) => {
    const username = req.params.username;
    res.render('tren', { username });
});
app.get('/ejercicios_numeros/:username/en', (req, res) => {
    const username = req.params.username;
    res.render('en', { username });
});


//2do de Primaria
app.get('/ejercicios_numeros2/:username/ema2', (req, res) => {
    const username = req.params.username;
    res.render('ema2', { username });
});
app.get('/ejercicios_numeros2/:username/emd2', (req, res) => {
    const username = req.params.username;
    res.render('emd2', { username });
});
app.get('/ejercicios_numeros2/:username/mercado2', (req, res) => {
    const username = req.params.username;
    res.render('mercado2', { username });
});
app.get('/ejercicios_numeros2/:username/caja2', (req, res) => {
    const username = req.params.username;
    res.render('caja2', { username });
});
app.get('/ejercicios_numeros2/:username/tren2', (req, res) => {
    const username = req.params.username;
    res.render('tren2', { username });
});
app.get('/ejercicios_numeros2/:username/en2', (req, res) => {
    const username = req.params.username;
    res.render('en2', { username });
});
app.get('/ejercicios_suma_resta2/:username/La_tiendita2', (req, res) => {
    const username = req.params.username;
    res.render('La_tiendita2', { username });
});
app.get('/ejercicios_suma_resta2/:username/sume2', (req, res) => {
    const username = req.params.username;
    res.render('sume2', { username });
});
app.get('/ejercicios_suma_resta2/:username/conteo2', (req, res) => {
    const username = req.params.username;
    res.render('conteo2', { username });
});
app.get('/ejercicios_suma_resta2/:username/smv2', (req, res) => {
    const username = req.params.username;
    res.render('smv2', { username });
});
app.get('/ejercicios_suma_resta2/:username/rv2', (req, res) => {
    const username = req.params.username;
    res.render('rv2', { username });
});
app.get('/ejercicios_suma_resta2/:username/cartas2', (req, res) => {
    const username = req.params.username;
    res.render('cartas2', { username });
});
app.get('/ejercicios_suma_resta2/:username/sr2', (req, res) => {
    const username = req.params.username;
    res.render('sr2', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla1', (req, res) => {
    const username = req.params.username;
    res.render('tabla1', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla2', (req, res) => {
    const username = req.params.username;
    res.render('tabla2', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla3', (req, res) => {
    const username = req.params.username;
    res.render('tabla3', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla4', (req, res) => {
    const username = req.params.username;
    res.render('tabla4', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla5', (req, res) => {
    const username = req.params.username;
    res.render('tabla5', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla6', (req, res) => {
    const username = req.params.username;
    res.render('tabla6', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla7', (req, res) => {
    const username = req.params.username;
    res.render('tabla7', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla8', (req, res) => {
    const username = req.params.username;
    res.render('tabla8', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla9', (req, res) => {
    const username = req.params.username;
    res.render('tabla9', { username });
});
app.get('/ejercicios_mul_div2/:username/tabla10', (req, res) => {
    const username = req.params.username;
    res.render('tabla10', { username });
});
app.get('/ejercicios_mul_div2/:username/frutas', (req, res) => {
    const username = req.params.username;
    res.render('frutas', { username });
});
app.get('/ejercicios_mul_div2/:username/globos', (req, res) => {
    const username = req.params.username;
    res.render('globos', { username });
});
app.get('/ejercicios_figuras2/:username/def', (req, res) => {
    const username = req.params.username;
    res.render('def', { username });
});
app.get('/ejercicios_figuras2/:username/figuras', (req, res) => {
    const username = req.params.username;
    res.render('figuras', { username });
});
app.get('/ejercicios_figuras2/:username/lados', (req, res) => {
    const username = req.params.username;
    res.render('lados', { username });
});
app.get('/ejercicios_figuras2/:username/tangram', (req, res) => {
    const username = req.params.username;
    res.render('tangram', { username });
});
app.get('/ejercicios_mcl2/:username/botellas', (req, res) => {
    const username = req.params.username;
    res.render('botellas', { username });
});
app.get('/ejercicios_mcl2/:username/bascula', (req, res) => {
    const username = req.params.username;
    res.render('bascula', { username });
});
app.get('/ejercicios_mcl2/:username/barras', (req, res) => {
    const username = req.params.username;
    res.render('barras', { username });
});
app.get('/ejercicios_tiempo2/:username/historia', (req, res) => {
    const username = req.params.username;
    res.render('historia', { username });
});
app.get('/ejercicios_tiempo2/:username/ct2', (req, res) => {
    const username = req.params.username;
    res.render('ct2', { username });
});
app.get('/ejercicios_tiempo2/:username/calendario', (req, res) => {
    const username = req.params.username;
    res.render('calendario', { username });
});
app.get('/ejercicios_datos2/:username/insectos', (req, res) => {
    const username = req.params.username;
    res.render('insectos', { username });
});
app.get('/ejercicios_datos2/:username/animales', (req, res) => {
    const username = req.params.username;
    res.render('animales', { username });
});
app.get('/ejercicios_datos2/:username/divisiones', (req, res) => {
    const username = req.params.username;
    res.render('divisiones', { username });
});


//Métodos

router.post('/auth', usuarios.LoginUsuarios)
router.get('/logout', Usession.LogOutUsuarios)
router.get('/validar', Usession.validarSesion)

router.post('/registro', upload.single('profilePic'), registro.RegistrarU);

module.exports = router;
