const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actuliazr-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  // validar el tipo
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status({
      ok: false,
      msg: "No es un medico, hospital o usuario (tipo)",
    });
  }

  //validacion de un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }
  // Procesar una imagen
  const file = req.files.imagen;

  // validar extension
  const nombreCortado = file.name.split(".");
  const extarchivo = nombreCortado[nombreCortado.length - 1];
  const extValida = ["png", "jpg", "jpeg", "gift"];

  if (!extValida.includes(extarchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension permitida",
    });
  }

  // generar el nomvre del archivo
  const nombreArchivo = `${uuidv4()}.${extarchivo}`;

  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }
    // actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);
    res.json({
      ok: true,
      msg: "Archivo subido",
      nombreArchivo,
    });
  });
};

const retornarImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/sinImagen.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  retornarImagen,
};
