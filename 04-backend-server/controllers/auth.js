const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //validar correo
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email no encontrado",
      });
    }

    // valiadr password
    const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña ni valida",
      });
    }

    // generar un json token
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    // guardar usuario
    await usuario.save();

    // generar el token - JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token de google no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {

  const uid = req.uid;

  // generar el token - jwt
  const token = await generarJWT( uid )

  // usuario
  const usuarioDB = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuarioDB
  })
}

module.exports = {
  login,
  googleSingIn,
  renewToken
};
