require('dotenv').config();
const express = require('express');
const routes = require('./routes/router')
const app = express();  

app.use(express.static('public'));  
app.set('view engine' , 'ejs');

// Este middleware permite leer JSON en el body de las peticiones
app.use(express.json());

// Si también se usa formularios tipo `application/x-www-form-urlencoded`:
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)

const PORT = process.env.PORT || 5601

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en el puerto: ${PORT}`)
})
