const axios = require("axios");

const apiUrl = "https://rickandmortyapi.com/api/character";

const fetchAllCharacters = async () => {
  const response = await axios.get(apiUrl);
  return response.data.results;
};

const fetchCharacterByName = async (name) => {
  const response = await axios.get(`${apiUrl}?name=${name}`);
  return response.data.results[0];
};

module.exports = { fetchAllCharacters, fetchCharacterByName };
