const conn = require('../config/conexion');
const crypto = require('crypto');

RegistrarU = async (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const grado = req.body.grado;
    const pass = crypto.createHash('sha256').update(req.body.contrasena, 'utf-8').digest('hex');
    const foto_perfil = req.body.foto_perfil; // Obtén la ruta relativa de la foto

    const sql = `INSERT INTO usuarios(nombre, correo, contrasena, usuario, grado_id, foto_perfil) 
                 VALUES ("${nombre}", "${correo}", "${pass}", "${usuario}", "${grado}", "${foto_perfil}")`;

    conn.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false,
                message: 'Error al registrar el usuario.'
            });
        } else {
            res.send({
                status: true,
                message: 'Usuario registrado correctamente.'
            });
        }
    });
}


module.exports = { RegistrarU };
