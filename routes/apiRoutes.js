const express = require("express");
const {
  getAllCharacters,
  getCharacterByName,
} = require("../controllers/apiController");
const { verificarToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/characters", verificarToken, getAllCharacters); // solo con usuario autenticado
router.get("/characters/:name", verificarToken, getCharacterByName); // solo con usuario autenticado

module.exports = router;
