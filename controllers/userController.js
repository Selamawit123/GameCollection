const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("user");

const getOne = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) =>
      user
        ? res.status(200).json({
            _id: user._id,
            username: user.username,
          })
        : res.status(404).json({ message: "User not found" })
    )
    .catch((err) => res.status(500).json(err));
};

const getAll = (req, res) => {
  User.find({ isAdmin: false })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
};

const update = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        console.log(user);
        bcrypt
          .genSalt(10)
          .then((salt) => {
            bcrypt
              .hash(req.body.password, salt)
              .then((hash) => {
                user.username = req.body.username;
                user.password = hash;
                user
                  .save()
                  .then((user) => res.status(200).json(user))
                  .catch((err) => res.status(500).json(err));
              })
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

const remove = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((user) =>
      res.status(200).json({ message: "User successfully deleted" })
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = { getOne, getAll, update, remove };
