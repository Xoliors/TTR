require('dotenv').config();
const express = require('express');
const routes = require('./routes/router')
const app = express();  
const bodyParser = require('body-parser');



app.use(express.static('public'));  
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', routes)

const PORT = process.env.PORT || 5601

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en el puerto: ${PORT}`)
})
