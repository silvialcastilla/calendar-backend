const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //es una referencia al Schema Usuario
        ref: 'Usuario',
        required: true
    }
})

//Se convierte a objeto para que no nos devuelva los campos _v e _id
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
})


const Evento = model('Evento', EventoSchema)

module.exports = {Evento};