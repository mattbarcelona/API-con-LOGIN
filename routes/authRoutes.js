const express = require("express");
const { login, logout } = require("../controllers/authController");
const { verificarToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", login); // vista de login
router.post("/logout", verificarToken, logout); // logout solo si está autenticado el usuario

module.exports = router;
