require("dotenv").config();
require("./src/config/mongooseConfig");
require("./src/config/dataConfig").init();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const gameRoutes = require("./src/routes/gameRoutes");
const cartRoutes = require("./src/routes/cartRoutes");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/cart", cartRoutes);


const server = app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port", server.address().port);
});
