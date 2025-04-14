// upload.js
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Ruta real donde se debe guardar el archivo
const dir = path.join(__dirname, '..', 'public', 'images', 'user_fp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Aquí se guarda físicamente el archivo
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = 'user-' + uniqueSuffix + ext;
        cb(null, filename); // Nombre de archivo que se guarda en el sistema

        // Guardar la ruta relativa en la base de datos
        req.body.foto_perfil = '/images/user_fp/' + filename; // Esto es lo que guardas en la base de datos
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
