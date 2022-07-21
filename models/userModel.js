const mongoose = require("mongoose");

const gameSchema = require("./gameModel");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  cart: [gameSchema],
  games: [gameSchema],
});

mongoose.model("user", userSchema, "users");
