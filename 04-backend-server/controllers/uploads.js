const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const fileUpload = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar el tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status({
            ok: false,
            msg: 'No es un medico, hospital o usuario (tipo)'
        });
    }

    //validacion de un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }
    // Procesar una imagen
    const file = req.files.imagen;

    // validar extension
    const nombreCortado = file.name.split('.');
    const extarchivo = nombreCortado[nombreCortado.length - 1];
    const extValida = ['png', 'jpg', 'jpeg', 'gift'];

    if(!extValida.includes(extarchivo)) {
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
        if(err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    })

};

module.exports = {
    fileUpload
}
