const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", staffController.register);
router.post("/login", staffController.login);
router.get("/me", authMiddleware, staffController.getMe);
router.post("/logout", staffController.logout);

module.exports = router;
