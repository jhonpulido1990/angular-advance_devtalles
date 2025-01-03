const { Router } = require("express");
const { login, googleSingIn, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const cors = require("cors");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login,
);

router.post(
  "/google",
  [
    check("token", "El token de google de obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSingIn
);

router.get('/renew',
  validarJWT,
  renewToken
)

module.exports = router;
