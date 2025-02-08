const users = require("../data/users");
const bcrypt = require("bcrypt");

const validateUser = (username, password) => {
  // busca al usuario por nombre de usuario
  const user = users.find((user) => user.username === username);
  // si el usuario existe --> compara la contraseña dada por el usuario con la de /data
  // si el usuario y la contraseña coinciden, devuelve el usuario
  // si el usuario y la contraseña NO coinciden devuelve null
  if (
    user &&
    bcrypt.compareSync(password, bcrypt.hashSync(user.password, 10))
  ) {
    return user;
  }
  return null;
};

module.exports = { validateUser };
