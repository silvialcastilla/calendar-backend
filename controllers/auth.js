const { response } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // if (name.length < 5) {
        //     return res.status(400).json({ "ok": true, "msg": "registro", name, email, password });
        // }

        let usuario = await Usuario.findOne({ email: email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({ "ok": true, uid: usuario.id, name: usuario.name, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor, hable con el administrador"
        })
    }



}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try{

        let usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //Confirmar las contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar nuestro JWT
         const token = await generarJWT(usuario.id, usuario.name);

        res.status(200).json({ "ok": true, uid: usuario.id, name: usuario.name, token: token });

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor, hable con el administrador"
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;

    //generar token
    const token = await generarJWT( uid, name );

    res.json({ "ok": true, uid: uid })
}

module.exports = { crearUsuario, loginUsuario, revalidarToken };