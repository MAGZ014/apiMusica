const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Musica = new Schema({
    artista: { type: String, required: true },
    nombre: { type: String, required: true },
    album: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: Number, required: true }
}, {
    collection: 'musica'
});

module.exports = mongoose.model('Musica', Musica);
