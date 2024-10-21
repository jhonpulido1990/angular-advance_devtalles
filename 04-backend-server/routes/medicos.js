/*
medicos
    Ruta: /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const router = Router();

router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("hospital", "el hopital id debe de ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", borrarMedico);

module.exports = router;
