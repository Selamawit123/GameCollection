const mongoose = require("mongoose");

const User = mongoose.model("user");
const Game = mongoose.model("game");

const checkout = (req, res) => {
  User.findOne({ _id: req.user_id })
    .then((user) => {
      if (user) {
        user.cart.forEach((game) => user.games.push(game));
        user.cart = [];
        console.log(user);
        user
          .save()
          .then((user) => res.status(200).json(user))
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).json(err));
};

const removeItem = (req, res) => {
  User.findOne({ _id: req.user_id })
    .then((user) => {
      if (user) {
        user.cart.id(req.params.id).remove();
        user
          .save()
          .then((user) => res.status(200).json(user))
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).json(err));
};

const getItems = (req, res) => {
  User.findOne({ _id: req.user_id })
    .then((user) => {
      if (user) {
        res.status(200).json(user.cart);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).json(err));
};

const addItem = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((game) => {
      if (game) {
        User.findOne({ _id: req.user_id })
          .then((user) => {
            if (user) {
              if (user.cart.id(game._id)) {
                res.status(400).json({ message: "Game already in cart" });
              } else {
                user.cart.push(game);
                user
                  .save()
                  .then((user) => res.status(200).json(user))
                  .catch((err) => res.status(500).json(err));
              }
            } else {
              res.status(404).send("User not found");
            }
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "Game not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = { checkout, removeItem, getItems, addItem };
