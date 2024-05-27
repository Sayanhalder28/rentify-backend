const express = require("express");
const {
  registerUser,
  loginUser,
  userDetails,
} = require("../controllers/userController");
const { varifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/details", varifyToken, userDetails);

module.exports = router;
