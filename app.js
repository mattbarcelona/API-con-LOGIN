const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const hashedSecret = require("./utils/bcrypt");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/", authRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () =>
  console.log(`Server listening 🤖 on http://localhost:${PORT}`)
);
