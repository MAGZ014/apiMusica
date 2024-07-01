const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Reemplaza con tu cadena de conexión de MongoDB Atlas
const mongoURI = 'mongodb+srv://EnigmA:I0NVGjvBdGGJ2J5P@cluster0.svtkyyr.mongodb.net/musica?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 segundos de tiempo de espera
}).then((x) => {
    console.log('Conexión perfecta ' + x.connections[0].name);
}).catch((error) => {
    console.log('Error de conexión', error);
});
// servidor web
const musicaRouter = require('./routes/musica.routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(cors());  // Corregido: Invocar cors()
app.use('/api', musicaRouter);

// habilitar puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
});

// manejador de error 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// manejador de errores
app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
