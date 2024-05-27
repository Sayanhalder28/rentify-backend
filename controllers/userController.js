// CREATE TABLE IF NOT EXISTS users (
//   `id` INT AUTO_INCREMENT PRIMARY KEY,
//   `email` VARCHAR(255) NOT NULL UNIQUE,
//   `password` VARCHAR(255) NOT NULL,
//   `first_name` VARCHAR(255) NOT NULL,
//   `last_name` VARCHAR(255) NOT NULL,
//   `phone_number` VARCHAR(20) NOT NULL,
//   `user_role` ENUM('buyer', 'seller') NOT NULL DEFAULT 'buyer',
//   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, userRole } =
    req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.createUser(
      email,
      hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      userRole
    );
    res.success(200, "User registered successfully", { userId: user });
  } catch (error) {
    res.error(500, error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.error(404, "User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.error(400, "Invalid password");
    }

    const token = generateToken(user);

    res.success(200, "User logged in successfully", { token: token });
  } catch (error) {
    res.error(500, error.message);
  }
};

exports.userDetails = async (req, res) => {
  const { user } = req;
  const userDetails = await User.getUserByEmail(user.email);
  res.success(200, "User details", {
    id: userDetails.id,
    email: userDetails.email,
    firstName: userDetails.first_name,
    lastName: userDetails.last_name,
    phoneNumber: userDetails.phone_number,
    userRole: userDetails.user_role,
  });
};
