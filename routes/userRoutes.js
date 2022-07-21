const express = require("express");

const router = express.Router();

const controller = require("../controllers/userController");

const middleware = require("../middleware/authMiddleware");

router.get("/", middleware.checkAdmin, controller.getAll);
router.get("/:id", middleware.checkAdmin, controller.getOne);
router.put("/:id", middleware.checkAdmin, controller.update);
router.delete("/:id", middleware.checkAdmin, controller.remove);

module.exports = router;
