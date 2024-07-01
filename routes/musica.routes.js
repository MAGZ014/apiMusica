const express = require('express');
const musicaRouter = express.Router();

let Musica = require('../models/Musica');

// Agregar Musica
musicaRouter.route('/agregar').post((req, res) => {
    Musica.create(req.body)  // Corregido: Musica.create en lugar de musicaRouter.create
        .then((data) => {
            console.log('Se agregó un documento');
            res.send(data);
        })
        .catch((error) => {  // Corregido: catch en lugar de chatch
            console.error(error);
            res.status(500).send(error.message);
        });
});

// Obtener todos los Musicas
musicaRouter.route('/musicas').get((req, res) => {
    Musica.find()  // Corregido: Musica.find en lugar de musicaRouter.find
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {  // Corregido: catch en lugar de chatch
            console.error(error);
            res.status(500).send(error.message);
        });
});

// Obtener Musica por ID
musicaRouter.route('/musica/:id').get((req, res) => {
    Musica.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {  // Corregido: catch en lugar de chatch
            console.error(error);
            res.status(500).send(error.message);
        });
});

// Actualizar Musica
musicaRouter.route('/actualizar/:id').put((req, res) => {
    Musica.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then((data) => {
            console.log('Se actualizó el documento');
            res.send(data);
        })
        .catch((error) => {  // Corregido: catch en lugar de chatch
            console.error(error);
            res.status(500).send(error.message);
        });
});

// Eliminar Musica
musicaRouter.route('/eliminar/:id').delete((req, res) => {
    Musica.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log('Se eliminaron los datos');
            res.send(data);
        })
        .catch((error) => {  // Corregido: catch en lugar de chatch
            console.error(error);
            res.status(500).send(error.message);
        });
});

module.exports = musicaRouter;
