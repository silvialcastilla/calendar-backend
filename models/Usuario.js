const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const Usuario = model('Usuario', UsuarioSchema)

module.exports = {Usuario};