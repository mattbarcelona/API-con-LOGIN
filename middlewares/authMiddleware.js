const jwt = require("jsonwebtoken");
const hashedSecret = require("../utils/bcrypt");

// generamos el token --> no middleware
// jwt.sign(datos para generar token, secreto, opciones)
const generarToken = (user) => {
  const token = jwt.sign({ user: user.id }, hashedSecret, { expiresIn: "1h" });
  return token;
};

// verificamos el token --> middleware
const verificarToken = (req, res, next) => {
  // const token = req.session.token --> ya no vamos a guardar así el token, para simplificar el test en postman
  // vamos a usar las Headers de la petición y dentro de esas Headers en postman pondremos el 'Bearer token'
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no generado 🔴" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "No se ha podido acceder al token 🔴" });
  }

  // si hay token generado
  // jwt.sign(token, secreto, callback con error y decodificación)
  jwt.verify(token, hashedSecret, (err, decoded) => {
    if (err) {
      // manejamos error si no se verifica el token
      return res.status(401).json({ mensaje: "Token no válido 🔴" });
    }

    // si se verifica el token, se decodifica con el user
    req.user = decoded.user;

    // pasamos el middleware
    next();
  });
};

module.exports = {
  generarToken,
  verificarToken,
};
