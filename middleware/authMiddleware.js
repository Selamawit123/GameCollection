const jwt = require("jsonwebtoken");
const util = require("util");

const checkAdmin = (req, res, next) => {
  const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ").length > 1
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwtVerifyPromise(token, process.env.TOKEN_SECRET)
      .then((token) => {
        if (token.isAdmin) {
          req.user_id = token.sub;
          next();
        } else _invalidAuthorization(req, res, err);
      })
      .catch((err) => _invalidAuthorization(req, res, err));
  } else {
    res.status(400).json({ message: "You must provide jwt token" });
  }
};

const checkUser = (req, res, next) => {
  const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ").length > 1
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwtVerifyPromise(token, process.env.TOKEN_SECRET)
      .then((token) => {
        req.user_id = token.sub;
        next();
      })
      .catch((err) => _invalidAuthorization(req, res, err));
  } else {
    res.status(400).json({ message: "You must provide jwt token" });
  }
};

const _invalidAuthorization = (req, res, err) => {
  res.status(401).json({ message: "JWT Token expired or invalid" });
};

module.exports = { checkAdmin, checkUser };
