const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const login = async (req, res =  response) => {
    const { email, password } = req.body;
    try {
        //validar correo
        const usuarioDB =  await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }

        // valiadr password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña ni valida'
            })
        }

        // generar un json token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: false,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}