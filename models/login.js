const conn = require('../config/conexion');
const crypto = require('crypto');

const loginUsuario = (usuario, contrasena, callback) => {
    // Hash SHA-256 de la contraseña
    const hash = crypto.createHash('sha256').update(contrasena).digest('hex');

    const query = `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND contrasena = '${hash}'`;

    conn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return callback(error, null);
        }

        return callback(null, result);
    });
};

const LogOutUsuarios = (req, res) => {
    //console.log('Entra logout');
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie(req.session); // eliminar la cookie de sesión
            //console.log('session',req.session)
            res.redirect('/');
            // redirigir al usuario a la página de inicio de sesión
        }
    });
}

const validarSesion = (req,res) => {
    res.send(req.session)
}


module.exports = { 
    loginUsuario,
    LogOutUsuarios,
    validarSesion};