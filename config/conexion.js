// Configuración de la conexión a la base de datos
const mysql = require('mysql2');

// Configuración del pool
const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 1800000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Validar la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos exitosa');
        connection.release(); // Muy importante liberar la conexión al pool
    }
});

// Exporta el pool de conexiones para su uso en otros módulos
module.exports = pool;
