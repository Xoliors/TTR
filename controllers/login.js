// controllers/login.js
const loginModel = require('../models/login');

const LoginUsuarios = (req, res) => {
    const { usuario, contrasena } = req.body;

    loginModel.loginUsuario(usuario, contrasena, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }

        if (result.length > 0) {
            req.session.usuario = result[0].usuario;
            req.session.nombre = result[0].nombre;
            req.session.correo = result[0].correo;
            req.session.grado_id = result[0].grado_id;
            req.session.foto_perfil = result[0].foto_perfil;

            console.log(result[0]); // <-- esto te dirá si `foto_perfil` existe y su valor


            return res.json({ success: true, usuario: result[0].nombre });
        } else {
            return res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
};

module.exports = {
    LoginUsuarios
};
