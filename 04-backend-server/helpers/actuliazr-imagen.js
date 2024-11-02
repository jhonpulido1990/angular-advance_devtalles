const fs = require("fs");

const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hopital = require("../models/hospitales");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No es un medico por Id");
        return false;
      }
      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);
      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "hospitales":
      const hopital = await Hopital.findById(id);
      if (!hopital) {
        console.log("No es un hopital por Id");
        return false;
      }
      pathViejo = `./uploads/hospitales/${hopital.img}`;
      borrarImagen(pathViejo);
      hopital.img = nombreArchivo;
      await hopital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es un usuario por Id");
        return false;
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
  }
};

module.exports = {
  actualizarImagen,
};
