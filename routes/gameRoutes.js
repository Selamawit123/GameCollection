const express = require("express");

const router = express.Router();

const controller = require("../controllers/gameController");

const middleware = require("../middleware/authMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", middleware.checkAdmin, controller.create);
router.put("/:id", middleware.checkAdmin, controller.update);
router.delete("/:id", middleware.checkAdmin, controller.remove);
router.get("/user/games", middleware.checkUser, controller.getUserGames);

module.exports = router;
