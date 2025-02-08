const {
  fetchAllCharacters,
  fetchCharacterByName,
} = require("../services/apiService");

const getAllCharacters = async (req, res) => {
  try {
    const characters = await fetchAllCharacters();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error al traer los personajes 🔴" });
  }
};

const getCharacterByName = async (req, res) => {
  const { name } = req.params;
  try {
    const character = await fetchCharacterByName(name);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ mensaje: "Personaje no encontrado 🔴" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "error al cargar el persobaje 🔴" });
  }
};

module.exports = { getAllCharacters, getCharacterByName };
