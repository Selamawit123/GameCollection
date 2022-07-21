const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("user");

const signup = (req, res) => {
  let response = {};
  User.findOne({ username: req.body.username })
    .then((user) => checkUserAndCreate(req, res, user, response))
    .catch((err) => _handleError(req, response));
};

const checkUserAndCreate = (req, res, user, response) => {
  if (user) {
    response.status = 400;
    response.body.message = "User already registered";
    _sendResponse(res, response);
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => {
        bcrypt
          .hash(req.body.password, salt)
          .then((hash) => {
            const newUser = {
              username: req.body.username,
              password: hash,
            };
            User.create(newUser)
              .then((user) => _handleSuccess(user, response))
              .catch((err) => {
                console.log(err);
                _handleError(req, response);
              })
              .finally(() => _sendResponse(res, response));
          })
          .catch((err) => _handleError(req, response));
      })
      .catch((err) => _handleError(req, response));
  }
};

const signin = (req, res) => {
  let response = {};
  User.findOne({ username: req.body.username })
    .then((user) => checkPasswordAndGenerateToken(req, res, user, response))
    .catch((err) => _handleError(req, response));
};

const checkPasswordAndGenerateToken = (req, res, user, response) => {
  if (user) {
    bcrypt.compare(req.body.password, user.password).then((isMatching) => {
      if (isMatching) {
        response.body = {
          username: user.username,
          isAdmin: user.isAdmin,
          cart: user.cart,
          token: jwt.sign(
            { sub: user._id, isAdmin: user.isAdmin },
            process.env.TOKEN_SECRET,
            {
              expiresIn: process.env.TOKEN_EXPIRE,
            }
          ),
        };
        res.status(200).json(response.body);
      } else {
        response.status = 400;
        response.body = { message: "User password doesnt match" };
        _sendResponse(res, response);
      }
    });
  } else {
    response.status = 400;
    response.body = { message: "User not registered" };
    _sendResponse(res, response);
  }
};

_sendResponse = (res, response) =>
  res.status(response.status).json(response.body);

const _handleSuccess = (body, response) => {
  response.status = 200;
  response.body = body;
};

const _handleError = (req, response) => {
  response.status = 500;
  response.body = {
    timestamp: new Date(),
    error: 500,
    message: "Something went wrong",
    path: req.originalUrl,
  };
};

module.exports = { signup, signin };
