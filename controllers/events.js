const { response } = require('express');
const { Evento } = require('../models/Evento')

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name'); //populate for get the object of user

    res.json({ ok: true, message: eventos });
}

const crearEvento = async (req, res = response) => {


    try {
        const evento = new Evento(req.body);

        evento.user = req.uid;

        await evento.save();

        res.status(201).json({ ok: true, message: evento })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "ok": false, "message": 'No se pudo guardar el evento' });
    }


}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;


    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({ "ok": false, message: "Evento no existe con este id" });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({ "ok": false, message: "No tiene privilegio de editar este evento" });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true }); //new para devolver los datos actualizados

        res.json({ "ok": false, message: eventoActualizado });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "ok": false,
            "message": "Contacte con el administrador"
        })
    }
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({ "ok": false, message: "Evento no existe con este id" });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({ "ok": false, message: "No tiene privilegio de editar este evento" });
        }

        const eventoBorrado = await Evento.findByIdAndDelete(eventoId);

        res.json({ ok: true, message: "Evento borrado" });

    } catch (error) {
        res.json(500).json({
            "ok": false,
            "message": "Contacte con el administrador"
        })
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}