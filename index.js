require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Creacion del inicio del servidor
const app = express();
const jsonParser = bodyParser.json();

// Inicio de conexion DB
const db = dbConnection();

// Configurar CORS
app.use(cors());

// Rutas del servidor
app.use('/api/users', jsonParser, require('./routes/users'));

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto: ' + process.env.PORT);
});