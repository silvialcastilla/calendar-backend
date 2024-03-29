const cors = require('cors');
const dbConnection = require('./database/config');
const express = require('express');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//base de datos
dbConnection();

//cors
app.use(cors());

//Rutas
//directorio publico. Use middleware
app.use(express.static('public'));


//lectura y parseo del body
app.use(express.json());

//rutas de auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones 
app.listen(4000, () => console.log(`Servidor corriendo en puerto ${4000}`))
//app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`))