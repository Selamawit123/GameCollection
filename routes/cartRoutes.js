const express = require("express");

const router = express.Router();

const controller = require("../controllers/cartController");

const middleware = require("../middleware/authMiddleware");

router.get("/", middleware.checkUser, controller.getItems);
router.get("/:id", middleware.checkUser, controller.addItem);
router.delete("/:id", middleware.checkUser, controller.removeItem);
router.get("/game/checkout", middleware.checkUser, controller.checkout);

module.exports = router;
