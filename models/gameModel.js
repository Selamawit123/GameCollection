const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  title: { type: String,},
  image: { type: String, },
  price: { type: Number, },
});

mongoose.model("game", gameSchema, "games");

module.exports = gameSchema;
