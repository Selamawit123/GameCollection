const mongoose = require("mongoose");
require("../models/gameModel");
require("../models/userModel");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected  to", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconneced");
});
