const { validateUser } = require("../services/userService");
const { generarToken } = require("../middlewares/authMiddleware");
const users = require("../data/users");

// Muestra la página de inicio o realiza el login
const login = (req, res) => {
  // traemos el nombre de usuario y la contraseña del req.body (usar en Postman)
  const { username, password } = req.body;
  // buscamos al usuario en data/users.js y si no existe mensajmos el error
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña no válidos ⛔" });
  }

  // si el usuario nos da dado el username y el password entonces validamos el usuario
  if (username && password) {
    // usamos la función validateUser para validar el usuario
    const userValidado = validateUser(username, password);
    // si el usuario se ha validado --> se genera el token con la función generarToken y el usuario validado
    // después guarda el token en el req.session y devuelve un json con el token
    if (userValidado) {
      const token = generarToken(userValidado);
      req.session.token = token;
      return res.json({ message: "Hola, estás logado 😁", token });
    }
  }
  // si el usuario no se ha validado devuelve un mensaje de no autorizado
  res.status(401).json({ message: "Usuario o contraseña no válidos ⛔" });
};

// Maneja el logout
const logout = (req, res) => {
  req.session = null; // también podemos usar destroy()
  res.json({ message: "Hasta pronto, has cerrado sesión 🥺" });
};

module.exports = { login, logout };
