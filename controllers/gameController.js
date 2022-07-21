const mongoose = require("mongoose");

const User = mongoose.model("user");
const Game = mongoose.model("game");

const getUserGames = (req, res) => {
  User.findOne({ _id: req.user_id })
    .then((user) => {
      console.log(user);
      if (user) {
        res.status(200).json(user.games);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).json(err));
};

const getOne = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((game) =>
      game
        ? res.status(200).json(game)
        : res.status(404).json({ message: "Game not found" })
    )
    .catch((err) => res.status(500).json(err));
};

const getAll = (req, res) =>
  Game.find({})
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(500).json(err));

const create = (req, res) => {
  const newGame = {
    title: req.body.title,
    image: req.body.image,
    price: req.body.price,
  };

  Game.create(newGame)
    .then((game) => res.status(200).json(game))
    .catch((err) => res.status(500).json(err));
};

const update = (req, res) => {
  Game.findOne({ title: req.body.title })
    .then((game) => {
      if (!game) {
        Game.findOne({ _id: req.params.id })
          .then((game) => {
            if (game) {
              game.title = req.body.title;
              game.image = req.body.image;
              game.price = req.body.price;
              game
                .save()
                .then((game) => res.status(200).json(game))
                .catch((err) => res.status(500).json(err));
            }
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(400).json({ message: "Game already exists" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

const remove = (req, res) => {
  Game.deleteOne({ _id: req.params.id })
    .then((game) =>
      res.status(200).json({ message: "Game successfully deleted" })
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = { getOne, getAll, create, update, remove, getUserGames };
