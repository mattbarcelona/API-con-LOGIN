const crypto = require("crypto");
const bcrypt = require("bcrypt");

const secret = crypto.randomBytes(64).toString("hex"); // crea una clave aleatoria de 64 bytes en formato hexadecimal
const hashedSecret = bcrypt.hashSync(secret, 10); // encripta la clave 'secret' con bcrypt y da diez saltos

module.exports = hashedSecret;
